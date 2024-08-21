import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'
import { beforeEach } from 'vitest'

const router = createRouterMock()
beforeEach(() => {
  router.reset()
  injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)
