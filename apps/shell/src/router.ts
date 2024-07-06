import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import mfeConfig from '@dklb/mfe-config'
import { loadRoutes } from '../src/utils/mfe'

export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('./pages/Error.vue'),
      },
    ],
  })

  const { shell, ...rest } = mfeConfig
  const entries = Object.values(rest)
    .flatMap(({ name, prefix }) => (name && prefix) ? [{ name, prefix }] : [])
  const routes = await loadRoutes(entries)
  for (const route of routes) router.addRoute(route)

  router.onError(() => router.push({ name: 'Error' }))

  app.use(router)
}
