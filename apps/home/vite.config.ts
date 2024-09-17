import mfeConfig from '@dklb/mfe-config'
import { reloadShell, remoteFederation } from '@dklb/vite-plugins'
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
    remoteFederation({
      name: 'home_app',
      extendExposes: {
        './LottoNumbers': './src/components/LottoNumbers.vue',
      },
    }),
    reloadShell(),
  ],
  server: { port: +mfeConfig.home.port, strictPort: true },
  preview: { port: +mfeConfig.home.port, strictPort: true },
  build: {
    cssCodeSplit: false,
    target: 'esnext',
  },
})
