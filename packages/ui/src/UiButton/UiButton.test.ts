import { mount } from '@vue/test-utils'
import UiButton from './UiButton.vue'

it('mount component', async () => {
  const component = mount(UiButton)
  expect(component.html()).toMatchInlineSnapshot(`"<button class="inline-flex text-sm uppercase text-center text-nowrap px-3 py-1.5 rounded-[0.25rem] bg-primary hover:bg-primary-darker text-white"></button>"`)
})
