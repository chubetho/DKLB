import type { Context } from 'elysia'
import { PORT } from '.'

const cache = new Map<string, any>()
export async function middleware<T>(c: Context) {
  const _url = c.request.url
  const cached = cache.get(_url)
  if (cached) {
    return cached as T
  }
  const url = _url.replace(`http://localhost:${PORT}`, 'https://www.lotto-bw.de')
  const response = await fetch(url)

  const value = await response.json()
  cache.set(_url, value)
  return value as T
}
