// @ts-check

/**
 * @typedef {import("vite").Plugin} Plugin
 * @typedef {import('./index').FederationConfig} FederationConfig
 */

import fs from 'node:fs'
import path from 'node:path'
import fastGlob from 'fast-glob'
import federation from '@originjs/vite-plugin-federation'

const { globSync } = fastGlob

/**
 * @return {Plugin}
 */
export function reloadEndpoint() {
  return {
    name: 'vite-plugin-reload-endpoint',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/__fullReload') {
          server.hot.send({ type: 'full-reload' })
          res.end('Full reload triggered')
          return
        }

        next()
      })
    },
  }
}

/**
 * @return {Plugin}
 */
export function reloadShell() {
  return {
    name: 'vite-plugin-reload-shell',
    apply(config, { command }) {
      return command === 'build' && !!config.build?.watch
    },
    buildEnd(error) {
      if (error)
        return

      fetch(`http://localhost:8000/__fullReload`)
    },
  }
}

/**
 * @param {FederationConfig} config
 * @return {Plugin}
 */
export function remoteFederation(config) {
  const {
    name,
    dir = 'src/pages',
    extendExposes = {},
  } = config

  const routes = globSync(`${dir}/**/*.vue`)
    .map((path) => {
      const lowerNoPrefixNoExt = path
        .toLowerCase()
        .replace(dir, '')
        .replace('.vue', '')

      const exposeName = lowerNoPrefixNoExt
        .split('/')
        .filter(Boolean)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1))
        .join('')

      const route = lowerNoPrefixNoExt.replace('+index', '')
      return { path, exposeName, route }
    })

  const exposes = { ...extendExposes }
  routes.forEach(({ path, exposeName }) => {
    exposes[`./${exposeName}`] = path
  })

  const dirPath = path.join('.', 'node_modules', '.federation')
  const filePath = path.join(dirPath, 'routes.json')
  fs.mkdirSync(dirPath, { recursive: true })

  const content = routes.map(r => ({
    path: r.route,
    component: r.exposeName,
  }))
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  exposes['./routes'] = filePath

  return federation({
    name,
    exposes,
    transformFileTypes: ['.js', '.ts', '.vue'],
    shared: ['vue', 'pinia', 'vue-router'],
  })
}
