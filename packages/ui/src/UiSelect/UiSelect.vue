<script setup lang="ts">
const props = defineProps<{
  options?: { label: string, value: string }[]
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="inline-block bg-white max-w-[200px] border border-[#c5c5c5] relative mb-2 ">
    <select v-model="model" class="py-[2px] pl-[5px] pr-[30px] h-[38px] appearance-none mr-[35px] w-full outline-none">
      <option
        v-for="{ label, value } in props.options"
        :key="value"
        class="text-[#444]"
        :value
      >
        {{ label }}
      </option>
    </select>
    <div class="bg-[#c5c5c5] absolute h-[38px] w-10 right-0 top-0 pointer-events-none flex-center">
      <MdiMenuDown class="text-[#707070]" />
    </div>
  </div>
</template>
