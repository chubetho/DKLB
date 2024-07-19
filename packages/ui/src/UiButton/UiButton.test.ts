import { mount } from '@vue/test-utils'
import RouterLink from 'vue-router-mock'
import UiButton from './UiButton.vue'

const slots = { default: () => 'Click me' }

it('rendered as a normal button', async () => {
  const component = mount(UiButton, { slots })
  const button = component.find('button')
  expect(button.exists()).toBe(true)
  expect(button.text()).toBe('Click me')
})

it('rendered as a link', async () => {
  const component = mount(
    UiButton,
    {
      slots,
      props: { to: '/' },
      global: { stubs: { RouterLink } },
    },
  )
  // const component = mount(UiButton, { slots, props: { to: '/' } })

  const link = component.find('a')
  expect(link.exists()).toBe(true)
  expect(link.text()).toBe('Click me')
})
