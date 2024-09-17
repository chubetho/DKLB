import type { App as _App } from '@dklb/api'
import { treaty } from '@elysiajs/eden'

const map = new Map<string, Response>()

export function useApi() {
  return treaty<_App>('localhost:3000', {
    async fetcher(url, opts) {
      const value = map.get(url.toString())
      if (value) {
        return Promise.resolve(value.clone())
      }

      return fetch(url, opts).then((response) => {
        map.set(url.toString(), response.clone())
        return response
      })
    },
  })
}
export type App = _App
