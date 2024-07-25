import { treaty } from '@elysiajs/eden'
import type { App as ApiApp } from '@dklb/api'

export function useApi() {
  return treaty<ApiApp>('localhost:3000')
}
export type App = ApiApp
