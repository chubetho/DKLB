import { mount } from '@vue/test-utils'
import UiButton from './UiButton.vue'

it('mount component', async () => {
  const component = mount(UiButton)
  expect(component.find('button').exists()).toBe(true)
})
