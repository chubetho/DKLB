import type { Config } from 'tailwindcss'
import config from '@dklb/tailwind'

export default {
  content: [...config.content, './**/*.{vue,ts}'],
  presets: [config],
} satisfies Config
