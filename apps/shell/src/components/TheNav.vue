<script setup lang="ts">
const links = [
  { name: 'LOTTO 6aus49', path: '/lotto6aus49/normalschein' },
  { name: 'EUROJACKPOT', path: '/eurojackpot' },
  { name: 'Rubbellose', path: '/', disabled: true },
  { name: 'KENO', path: '/', disabled: true },
  { name: 'GlücksSpirale', path: '/', disabled: true },
  { name: 'TOTO', path: '/', disabled: true },
]
</script>

<template>
  <header class="fixed z-[3] w-full block">
    <div class=" text-white h-[40px] font-bold bg-[#404040]">
      <div class="flex items-center h-full max-w-[1170px] mx-auto px-5">
        <div class="mr-auto">
          Menu
        </div>
        <ul class="flex">
          <li class="min-w-[155px] px-[20px] text-center">
            Registrieren
          </li>
          <li class="min-w-[155px] px-[20px] text-center">
            Anmelden
          </li>
          <li class="min-w-[155px] px-[20px] text-center">
            Warenkorb
          </li>
        </ul>
      </div>
    </div>

    <div class="font-bold bg-[#fd0]">
      <div class="flex max-w-[1170px] mx-auto px-5">
        <div class="flex items-center mr-auto h-[56px]">
          <RouterLink to="/" class="text-red-600 text-3xl font-bold">
            Lotto Berlin
          </RouterLink>
        </div>
        <ul class="flex text-[#222] [&>li]:flex [&>li]:items-center [&>li]:h-[56px]">
          <li v-for="{ name, path, disabled } in links" :key="name">
            <RouterLink :to="path" class="text-xl text-center px-[15px]" :class="{ 'cursor-not-allowed opacity-50 line-through': disabled }">
              {{ name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
