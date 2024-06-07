import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as UiButton } from './UiButton.vue'

export const uiButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm uppercase ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary-darker text-white',
        outline: 'bg-transparent border-2 border-[#444] text-[#444] hover:text-white hover:bg-[#707070] hover:shadow-md',
        secondary: 'bg-[#c5c5c5] text-white',
      },
      size: {
        default: 'px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type UiButtonVariants = VariantProps<typeof uiButtonVariants>
