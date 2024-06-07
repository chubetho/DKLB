import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { getNumbers } from './routes'

export const PORT = import.meta.env.PORT || 3000

const app = new Elysia()
  .use(cors({
    origin(req) {
      return req.headers.get('origin') === 'http://localhost:8000'
    },
  }))

  .use(getNumbers())

  .listen(3000)

if (import.meta.env.NODE_ENV === 'DEV')
  console.log(`Server is running at http://localhost:${PORT}`)

export type App = typeof app
