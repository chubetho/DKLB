import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { reloadShell, remoteFederation } from '@dklb/vite-plugins'
import mfeConfig from '@dklb/mfe-config'
import Icons from 'unplugin-icons/vite'

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
      name: 'lotto_app',
      remotes: {
        [mfeConfig.home.name!]: mfeConfig.home.port,
      },
    }),
    reloadShell(),
  ],
  server: { port: +mfeConfig.lotto.port, strictPort: true },
  preview: { port: +mfeConfig.lotto.port, strictPort: true },
  build: {
    cssCodeSplit: false,
    target: 'esnext',
  },
})
