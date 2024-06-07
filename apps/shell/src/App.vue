<script setup lang="ts">
</script>

<template>
  <TheNav />

  <main class="max-w-6xl pt-[96px] bg-white mx-auto">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <footer class="bg-[#e6e6e6] px-5 py-10 text-center max-w-6xl mx-auto">
    <ul class="w-1/2 mx-auto flex-center gap-x-2 gap-y-1 flex-wrap text-sm ">
      <li> Teinahmebedingungen</li>
      <li><span class="px-2">|</span> Datenschutzt</li>
      <li><span class="px-2">|</span> Kontakt</li>
      <li><span class="px-2">|</span> Newsletter</li>
      <li><span class="px-2">|</span> Übersicht</li>
      <li><span class="px-2">|</span> Impressum</li>
      <li><span class="px-2">|</span> Apps</li>
      <li><span class="px-2">|</span> FAQ</li>
      <li><span class="px-2">|</span> Barrierefreiheit</li>
      <li><span class="px-2">|</span> Dauerspiel hier kündigen</li>
    </ul>
  </footer>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
