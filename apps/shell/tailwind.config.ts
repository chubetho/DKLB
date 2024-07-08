import type { Config } from 'tailwindcss'
import config from '@dklb/tailwind'

export default {
  content: config.content,
  corePlugins: {
    preflight: true,
  },
  presets: [config],
} satisfies Config
