<script setup lang="ts">
import { useDialog } from './src/UiDialog'

const { open, close } = useDialog({
  attrs: {
    title: 'Dialog Title',
    onClose: () => close(),
  },
  slots: {
    default: () => 'sdf' as any,
    footer: () => 'footer' as any,
  },
})
</script>

<template>
  <main class="flex-center h-full w-full">
    <button @click="open">
      Show Modal
    </button>
  </main>

  <div id="dialog-container" />
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  background: #8e8e88;
  color: white;
}
</style>
