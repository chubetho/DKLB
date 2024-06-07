import { treaty } from '@elysiajs/eden'
import type { App } from '@dklb/api'

export function useApi() {
  return treaty<App>('localhost:3000')
}
