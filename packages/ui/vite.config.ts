import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 1,
      defaultClass: 'block text-2xl',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@vueuse/core'],
      output: { globals: { vue: 'Vue' } },
      onwarn: (warning, warn) => {
        // silent "createCommentVNode" is imported from external module "vue" but never used in
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT')
          return

        warn(warning)
      },
    },
  },
})
