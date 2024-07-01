import { write } from 'bun'
import mfeConfig from '../tools/mfe-config'

(function () {
  const cors = `
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';
      `

  let minPort = Number.POSITIVE_INFINITY
  let maxPort = Number.NEGATIVE_INFINITY

  ;(async () => {
    const copies: string[] = []

    Object.entries(mfeConfig).forEach(async ([key, { port, dir }]) => {
      if (!port || !dir)
        return

      if (+port < minPort)
        minPort = +port
      if (+port > maxPort)
        maxPort = +port

      const isShell = key === 'shell'
      const confPath = `.nginx/${dir}.conf`
      const str = `server {
      listen ${port};
      server_name localhost;
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
    })

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
  })()

  ;(async () => {
    const content = `services:
  apps:
    build:
      context: .
      dockerfile: Dockerfile.apps
    ports:
      - '${minPort}-${maxPort}:${minPort}-${maxPort}'

  server:
    build:
      context: .
      dockerfile: Dockerfile.server
    ports:
      - '3000:3000'
`

    await write('docker-compose.yml', content)
  })()
})()
