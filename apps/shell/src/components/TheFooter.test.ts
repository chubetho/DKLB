import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import TheFooter from './TheFooter.vue'

it('mount component', async () => {
  const component = mount(TheFooter)
  expect(component.findAll('li').map(e => e.text()).join()).toMatchInlineSnapshot(`"Teinahmebedingungen,| Datenschutzt,| Kontakt,| Newsletter,| Übersicht,| Impressum,| Apps,| FAQ,| Barrierefreiheit,| Dauerspiel hier kündigen"`)
})
