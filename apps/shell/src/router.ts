import type { App } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import mfeConfig from '@dklb/mfe-config'
import { useRemote } from '../src/utils/mfe'

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

async function loadRoutes(entries: { name: string, prefix: string }[]) {
  const promises = entries.map(async ({ name, prefix }) => {
    try {
      const { getModule } = await useRemote(name)
      const routes = await getModule<{ path: string, component: string }[] | undefined>('routes')
      if (!routes || !routes.length)
        return []

      return routes.map(route => ({
        path: prefix === '/' ? route.path : `${prefix}${route.path}`,
        component: async () => getModule(route.component),
      }))
    }
    catch (e) {
      console.error(`Error loading routes from ${name}: `, e)
    }
  })

  const routes: RouteRecordRaw[] = []
  const results = await Promise.allSettled(promises)
  results.forEach((result) => {
    if (result.status === 'rejected' || !result.value)
      return

    routes.push(...result.value)
  })

  return routes
}
