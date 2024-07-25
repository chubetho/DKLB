<script setup lang="ts">
import { GLOBAL_STATE_KEY } from '@dklb/utils'
import { provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheNav from './components/TheNav.vue'
import TheFooter from './components/TheFooter.vue'

const logs = ref<string[]>([])
provide(GLOBAL_STATE_KEY, logs)

const route = useRoute()
watch(route, (v) => {
  logs.value.push(v.path)
})
</script>

<template>
  <TheNav />

  <main class="max-w-6xl pt-[96px] bg-white mx-auto">
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-100 ease-in-out"
        leave-active-class="transition-opacity duration-100 ease-in-out"
        enter-from-class="opacity-0"
        leave-from-class="opacity-0"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <TheFooter />
</template>
