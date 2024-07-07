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
