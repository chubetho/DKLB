import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation, { type RemotesObject } from '@originjs/vite-plugin-federation'
import { reloadEndpoint } from '@dklb/vite-plugins'
import mfeConfig from '@dklb/mfe-config'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'

const { shell, ...rest } = mfeConfig
const remotes = Object.entries(rest).reduce((acc, [key, value]) => {
  if (key === 'shell')
    return acc

  acc[`${key}_app`] = {
    external: `http://localhost:${value.port}/assets/remoteEntry.js`,
    format: 'esm',
    from: 'vite',
    externalType: 'url',
  }
  return acc
}, {} as RemotesObject)

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
    federation({
      name: 'shell_app',
      transformFileTypes: ['.js', '.ts', '.vue'],
      remotes,
      shared: ['vue', 'pinia', 'vue-router'],
    }),
    reloadEndpoint(),
  ],
  css: { transformer: 'lightningcss' },
  server: { port: +shell.port, strictPort: true },
  preview: { port: +shell.port, strictPort: true },
  build: { target: 'esnext' },
})
