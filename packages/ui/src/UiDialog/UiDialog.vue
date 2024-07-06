<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <dialog
    class="
    [@starting-style]:open:opacity-0 [@starting-style]:open:backdrop:bg-[rgb(0_0_0_/_0%)]
    opacity-0 transition-all duration-300 [transition-behavior:_allow-discrete]
    backdrop:bg-[rgb(0_0_0_/_0%)] backdrop:transition-all backdrop:duration-300 backdrop:[transition-behavior:_allow-discrete]
    open:opacity-100 open:backdrop:bg-[rgb(0_0_0_/_25%)]"
  >
    <div class="bg-white p-6 relative min-w-[720px]">
      <button class="absolute top-5 right-5" autofocus @click="emits('close')">
        <MdiClose class="text-primary" />
      </button>

      <div class="w-full px-4">
        <h2 class="mb-7 text-2xl text-[#707070] uppercase font-medium">
          {{ props.title }}
        </h2>

        <slot />

        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>
