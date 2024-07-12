import { write } from 'bun'
import mfeConfig from '../tools/mfe-config'

async function dockerfile() {
  const cors = `
  add_header 'Access-Control-Allow-Origin' 'http://localhost:8000';
  add_header 'Access-Control-Allow-Methods' 'GET';
  add_header 'Access-Control-Allow-Headers' 'Content-Type';
  `
  const copies: string[] = []
  let minPort = Number.POSITIVE_INFINITY
  let maxPort = Number.NEGATIVE_INFINITY

  const entries = Object.entries(mfeConfig)

  for (const [key, { port, dir }] of entries) {
    if (!port || !dir)
      continue

    const _port = Number.parseInt(port)
    if (_port < minPort)
      minPort = _port
    if (_port > maxPort)
      maxPort = _port

    const isShell = key === 'shell'
    const confPath = `.nginx/${dir}.conf`
    const str = `server {
      listen ${port};
      server_name localhost_${dir};
      ${isShell ? '' : cors}
      location / {
        root      /usr/share/nginx/html/${dir};
        index     index.html;
        ${isShell ? 'try_files $uri $uri/ /index.html;' : ``}
      }
    }
`
    copies.push(`COPY --from=build /dklb/apps/${dir}/dist ${dir}`)

    await write(confPath, str)
  }

  const content = `FROM oven/bun:slim AS build
WORKDIR /dklb
COPY . .
RUN bun install
RUN bun run build:ui
RUN bunx run-p build:apps build:shell

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf * && rm -f /etc/nginx/conf.d/default.conf
COPY .nginx/*.conf /etc/nginx/conf.d

${copies.join('\n')}

EXPOSE ${minPort}-${maxPort}
ENTRYPOINT ["nginx", "-g", "daemon off;"]
`

  await write('Dockerfile.apps', content)

  return { minPort, maxPort }
}

async function dockercompose({ minPort, maxPort }: { minPort: number, maxPort: number }) {
  const content = `services:
  apps:
    build:
      context: .
      dockerfile: Dockerfile.apps
    ports:
      - '${minPort}-${maxPort}:${minPort}-${maxPort}'
    depends_on:
      - server

  server:
    build:
      context: .
      dockerfile: Dockerfile.server
    ports:
      - '3000:3000'
`
  await write('docker-compose.yml', content)
}

const { minPort, maxPort } = await dockerfile()
await dockercompose({ minPort, maxPort })
