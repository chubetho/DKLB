<script setup lang="ts">
import TheFooter from './components/TheFooter.vue'
import TheNav from './components/TheNav.vue'
</script>

<template>
  <TheNav />

  <main class="max-w-6xl pt-[96px] bg-white mx-auto">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>

  <TheFooter />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
