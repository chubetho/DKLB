<script setup lang="ts">
import { type App, useApi } from '@dklb/eden'
import { UiButton, UiSelect, UiSeparator } from '@dklb/ui'
import MdiChevronRight from '~icons/mdi/chevron-right'
import { shallowRef, watch } from 'vue'
import { useFetchGcKey } from '../composables/fetch'
import IconKenoWhite from './icons/IconKenoWhite.vue'

const api = useApi()
const { year, key, drawOpts, yearsOpts } = useFetchGcKey('keno')
const result = shallowRef<App['_routes']['getKenoHistoricNumbers']['get']['response']['200'] | null>(null)

watch(key, async (gckey) => {
  if (gckey) {
    api.getKenoHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      result.value = data
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-[30px]">
      <IconKenoWhite class="max-w-[200px] max-h-[30px] fill-[#707070]" />
    </div>

    <UiSeparator class="bg-[#707070] h-[2px]" />

    <div class="flex items-center mb-5">
      <span class="mr-4">Ziehung vom:</span>
      <UiSelect v-model="key" :options="drawOpts" class="mr-6 w-[200px]" />
      <UiSelect v-model="year" :options="yearsOpts" class="w-[110px]" />
    </div>

    <template v-if="result">
      <ul
        v-if="result.numbersInNaturalOrder"
        class="flex flex-wrap gap-x-1 gap-y-2"
      >
        <li
          v-for="n in result.numbersInNaturalOrder"
          :key="n"
          class="w-10 h-10 bg-white rounded-full flex-center text-lg"
        >
          {{ n }}
        </li>
      </ul>

      <div
        v-if="result.plus5Number"
        class="border-y border-[#c7c6c6] mt-5 py-1"
      >
        <span class="mr-10">plus5</span>
        <span class="tracking-[0.5vw] text-lg ">{{ result.plus5Number }}</span>
      </div>

      <div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-auto">
        <div />

        <UiButton variant="outline" class="w-full" disabled>
          Quoten <MdiChevronRight />
        </UiButton>

        <UiButton class="w-full" disabled>
          Gewinnprüfung <MdiChevronRight />
        </UiButton>

        <UiButton class="w-full" disabled>
          jetzt spielen <MdiChevronRight />
        </UiButton>
      </div>
    </template>
  </div>
</template>
