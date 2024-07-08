import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { numbers } from './routes/numbers'

export const PORT = import.meta.env.PORT || 3000

// eslint-disable-next-line unused-imports/no-unused-vars
const app = new Elysia()
  .derive(async ({ request }) => {
    const origin = request.headers.get('origin')
    return origin === 'http://localhost:8000'
      ? { authorized: true }
      : { authorized: false }
  })
  .use(cors({ origin: /http:\/\/localhost:8000/ }))

  // routes
  .use(numbers())

  .listen(3000)

export type App = typeof app
