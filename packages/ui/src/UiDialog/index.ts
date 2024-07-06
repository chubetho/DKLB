import { Teleport, createVNode, defineComponent, h, render, shallowRef } from 'vue'
import UiDialog from './UiDialog.vue'

export { UiDialog }

type UiDialogType = InstanceType<typeof UiDialog>

export function useDialog(
  opts: {
    attrs?: UiDialogType['$props']
    slots?: UiDialogType['$slots']
  },
) {
  const dialogEl = shallowRef<UiDialogType>()
  const Dialog = defineComponent({
    setup() {
      const attrs: any = { ...opts.attrs, ref: dialogEl }
      return () => h(Teleport, { to: 'body' }, h(UiDialog, attrs, opts.slots))
    },
  })

  let container: Element | null = null

  const open = () => {
    const vNode = createVNode(Dialog)
    container = document.createDocumentFragment() as unknown as Element
    render(vNode, container)
    if (dialogEl.value?.$el)
      dialogEl.value.$el.showModal()
  }

  const close = () => {
    if (!dialogEl.value?.$el)
      return

    dialogEl.value.$el.close()

    setTimeout(() => {
      if (container)
        render(null, container)
      if (container?.remove)
        container.remove()
      if (container?.parentElement?.remove)
        container.parentElement.remove()
    }, 300)
  }
  return { open, close }
}
