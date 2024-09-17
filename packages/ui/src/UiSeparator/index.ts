import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as UiSeparator } from './UiSeparator.vue'

export const uiSeparatorVariants = cva(
  'shrink-0 bg-[#eee] mt-4 mb-4',
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'w-px h-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

export type UiSeparatorVariants = VariantProps<typeof uiSeparatorVariants>
