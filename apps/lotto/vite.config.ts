import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { reloadShell, remoteFederation } from '@dklb/vite-plugins'
import mfeConfig from '@dklb/mfe-config'
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
      imports: ['vue', 'vue-router', 'vitest'],
      dirs: ['./src/composables'],
      vueTemplate: true,
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    Components({
      dirs: ['./src/components'],
      dts: true,
      resolvers: [
        IconResolver({
          prefix: false,
          enabledCollections: ['mdi'],
        }),
      ],
    }),
    remoteFederation({ name: 'lotto_app' }),
    reloadShell(),
  ],
  css: { transformer: 'lightningcss' },
  server: { port: +mfeConfig.lotto.port, strictPort: true },
  preview: { port: +mfeConfig.lotto.port, strictPort: true },
  build: {
    cssCodeSplit: false,
    target: 'esnext',
  },
})
