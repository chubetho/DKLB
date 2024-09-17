<script setup lang="ts">
import TheFooter from './components/TheFooter.vue'
import TheNav from './components/TheNav.vue'
</script>

<template>
  <TheNav />

  <main class="max-w-6xl pt-[96px] bg-white mx-auto">
    <RouterView />
  </main>

  <TheFooter />
</template>
