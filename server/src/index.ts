import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { numbers } from './routes/numbers'

export const PORT = import.meta.env.PORT || 3000

const app = new Elysia()
  // plugins
  .use(cors({ origin: /http:\/\/localhost:8000/ }))
  // routes
  .use(numbers())

  .listen(3000)

if (import.meta.env.NODE_ENV === 'DEV')
  console.log(`Server is running at http://localhost:${PORT}`)

export type App = typeof app
