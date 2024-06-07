<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { type UiSeparatorVariants, uiSeparatorVariants } from '.'

interface Props {
  orientation?: UiSeparatorVariants['orientation']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <hr :class="cn(uiSeparatorVariants({ orientation: props.orientation }), props.class)">
</template>
