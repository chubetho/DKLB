<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { RouterLinkProps } from 'vue-router'
import { type UiButtonVariants, uiButtonVariants } from '.'
import { cn } from '../utils/utils'

interface Props {
  variant?: UiButtonVariants['variant']
  size?: UiButtonVariants['size']
  class?: HTMLAttributes['class']
  type?: 'button' | 'submit' | 'reset'
  to?: RouterLinkProps['to']
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink
    v-if="props.to"
    :to="props.to"
    :class="cn(uiButtonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </RouterLink>

  <button
    v-else
    :class="cn(uiButtonVariants({ variant: props.variant, size: props.size }), props.class)"
    :type="props.type || 'button'"
  >
    <slot />
  </button>
</template>
