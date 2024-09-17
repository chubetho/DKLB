<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type UiSeparatorVariants, uiSeparatorVariants } from '.'
import { cn } from '../utils/utils'

interface Props {
  orientation?: UiSeparatorVariants['orientation']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <hr :class="cn(uiSeparatorVariants({ orientation: props.orientation }), props.class)">
</template>
