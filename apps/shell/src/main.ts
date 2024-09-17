import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

import './style.css'
import '@dklb/ui/dist/style.css'

const app = createApp(App)
app.use(createPinia())
setupRouter(app).then(() => app.mount('#app'))
