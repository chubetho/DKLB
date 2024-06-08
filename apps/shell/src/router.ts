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

  router.onError(() => router.push({ name: 'Error' }))

  const { shell, ...rest } = mfeConfig
  const remoteEntries = Object.values(rest).map(({ name, prefix }) => ({ name, prefix }))
  const routes = await loadRoutes(remoteEntries)
  routes.forEach(route => router.addRoute(route))

  app.use(router)
}
