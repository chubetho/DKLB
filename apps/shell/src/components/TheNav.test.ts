import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import TheNav from './TheNav.vue'

it('mount component', async () => {
  const component = mount(TheNav)
  expect(component.findAll('router-link-stub').length).toBe(7)
})
