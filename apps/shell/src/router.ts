import type { App } from 'vue'
import mfeConfig from '@dklb/mfe-config'
import { createRouter, createWebHistory } from 'vue-router'
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

  router.onError(() => router.push({ name: 'Error' }))

  const { _, ...rest } = mfeConfig
  const values = Object.values(rest).flatMap(
    ({ name, prefix }) => (name && prefix) ? [{ name, prefix }] : [],
  )
  const routes = await loadRoutes(values)
  for (const route of routes) router.addRoute(route)

  app.use(router)
}
