import { __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'
import type { RouteRecordRaw } from 'vue-router'

async function useRemote(name: string) {
  const getModule = async <T>(path: string) => {
    const wrapped = await __federation_method_getRemote(name, `./${path}`)
    return __federation_method_unwrapDefault(wrapped) as T
  }

  return { getModule }
}

export async function loadRoutes(entries: { name: string, prefix: string }[]) {
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
