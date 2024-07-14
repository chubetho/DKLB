import { write } from 'bun'
import mfeConfig from '../tools/mfe-config'

async function dockerfileServer() {
  const content = `FROM oven/bun:slim
WORKDIR /dklb

COPY ./server ./

RUN sed -i '/"@dklb\/eslint-config": "workspace:\^"/d' ./package.json && \\
    sed -i '/"@dklb\/tsconfig": "workspace:\^"/d' ./package.json

RUN bun install --production --ignore-scripts

EXPOSE 3000
ENTRYPOINT ["bun", "run", "start"]
`
  await write('dockers/Dockerfile.server', content)
}

async function dockerfileApps() {
  const cors = `
      add_header 'Access-Control-Allow-Origin' 'http://localhost:8000';
      add_header 'Access-Control-Allow-Methods' 'GET';
      add_header 'Access-Control-Allow-Headers' 'Content-Type';
`

  const entries = Object.values(mfeConfig)
  for (const { port, dir } of entries) {
    const isShell = dir === 'shell'
    const confPath = `.nginx/${dir}.conf`
    const str = `server {
      listen ${port};
      server_name localhost_${dir};
      ${isShell ? '' : cors}
      location / {
        root      /usr/share/nginx/html/${dir};
        index     index.html;
        ${isShell ? 'try_files $uri $uri/ /index.html;' : ''}
      }
}
`

    await write(confPath, str)

    const content = `FROM oven/bun:slim AS build
WORKDIR /dklb
COPY . .
RUN bun install
RUN bun run build:ui
RUN bun run --cwd apps/${dir} build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf * && rm -f /etc/nginx/conf.d/default.conf
COPY .nginx/*.conf /etc/nginx/conf.d
COPY --from=build /dklb/apps/${dir}/dist ${dir}

EXPOSE ${port}
ENTRYPOINT ["nginx", "-g", "daemon off;"]
`

    await write(`dockers/Dockerfile.${dir}`, content)
  }
}

async function dockercompose() {
  const entries = Object.values(mfeConfig)

  const contents = [
    `services:
  server:
    build:
      context: .
      dockerfile: dockers/Dockerfile.server
    ports:
      - '3000:3000'`,
  ]

  for (const { port, dir } of entries) {
    const content = `
  ${dir}:
    build:
      context: .
      dockerfile: dockers/Dockerfile.${dir}
    ports:
      - '${port}:${port}'
    depends_on:
      - server`
    contents.push(content)
  }

  await write('docker-compose.yml', contents.join('\n'))
}

dockerfileServer()
dockerfileApps()
dockercompose()
