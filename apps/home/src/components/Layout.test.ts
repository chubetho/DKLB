import { mount } from '@vue/test-utils'
import Layout from './Layout.vue'

it('mount component', async () => {
  const component = mount(Layout)
  expect(component.findAll('router-link-stub').length).toBeGreaterThan(0)
})
