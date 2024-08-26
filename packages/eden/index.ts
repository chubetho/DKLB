import { treaty } from '@elysiajs/eden'
import type { App as _App } from '@dklb/api'

export function useApi() {
  return treaty<_App>('http://209.38.249.17:3000')
}
export type App = _App
