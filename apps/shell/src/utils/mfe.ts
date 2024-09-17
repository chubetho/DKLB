import type { RouteRecordRaw } from 'vue-router'
import { __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

interface ExposeRoute {
  path: string
  component: string
}

async function useRemote(name: string) {
  const getModule = async <T>(path: string) => {
    const wrapped = await __federation_method_getRemote(name, `./${path}`)
    if (!wrapped)
      return
    return __federation_method_unwrapDefault(wrapped) as T | undefined
  }

  return { getModule }
}

export async function loadRoutes(entries: { name: string, prefix: string }[]) {
  const promises = entries.map(async ({ name, prefix }) => {
    try {
      const { getModule } = await useRemote(name)
      const routes = await getModule<ExposeRoute[]>('routes')
      if (!routes || !routes.length)
        return []

      return routes.map(route => ({
        path: prefix === '/' ? route.path : `${prefix}${route.path}`,
        component: async () => getModule(route.component),
      }))
    }
    catch (e) {
      console.error(`Error loading routes from ${name}: `, e)
      return []
    }
  })

  const routes: RouteRecordRaw[] = []
  const results = await Promise.allSettled(promises)
  for (const result of results) {
    if (result.status === 'rejected' || !result.value)
      continue
    for (const route of result.value) routes.push(route)
  }

  return routes
}
