import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue() as any],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    globals: true,
  },
})
