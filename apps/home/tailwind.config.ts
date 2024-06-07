import type { Config } from 'tailwindcss'
import config from '@dklb/tailwind'

export default {
  content: config.content,
  presets: [config],
} satisfies Config
