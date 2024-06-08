import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 1,
      defaultClass: 'block text-2xl',
    }),
    AutoImport({
      imports: ['vue', 'vitest'],
      dirs: ['./src/composables'],
      vueTemplate: true,
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    Components({
      dirs: ['./src'],
      dts: true,
      resolvers: [
        IconResolver({
          prefix: false,
          enabledCollections: ['mdi'],
        }),
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ui',
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
