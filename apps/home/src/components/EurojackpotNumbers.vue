<script setup lang="ts">
import { UiButton, UiSelect, UiSeparator } from '@dklb/ui'
import { type App, useApi } from '@dklb/eden'
import { shallowRef, watch } from 'vue'
import { useFetchGcKey } from '../composables/fetch'
import IconEurojackpotDot from './icons/IconEurojackpotDot.vue'
import MdiChevronRight from '~icons/mdi/chevron-right'

const api = useApi()
const { year, key, drawOpts, yearsOpts } = useFetchGcKey('eurojackpot')
const result = shallowRef<App['_routes']['getEurojackpotHistoricNumbers']['get']['response']['200'] | null>(null)

watch(key, (gckey) => {
  if (gckey) {
    api.getEurojackpotHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      result.value = data
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-[30px]">
      <IconEurojackpotDot class="max-w-[200px] max-h-[30px] fill-[#707070]" />
    </div>

    <UiSeparator class="bg-[#707070] h-[2px]" />

    <div class="flex items-center mb-5">
      <span class="mr-4">Ziehung vom:</span>
      <UiSelect v-model="key" :options="drawOpts" class="mr-6 w-[200px]" />
      <UiSelect v-model="year" :options="yearsOpts" class="w-[110px]" />
    </div>

    <div v-if="result" class="flex gap-6">
      <div>
        <span class="text-lg mb-1">5 aus 50</span>
        <ul class="flex gap-1.5">
          <li
            v-for="n in result.numbersInNaturalOrder" :key="n"
            class="w-10 h-10 rounded-full bg-white flex-center text-lg"
          >
            {{ n }}
          </li>
        </ul>
      </div>
      <div>
        <span class="text-lg mb-1">2 aus 12</span>
        <ul class="flex gap-1.5">
          <li
            v-for="n in result.additionalNumbersInNaturalOrder" :key="n"
            class="w-10 h-10 rounded-full bg-[#707070] text-white flex-center text-lg"
          >
            {{ n }}
          </li>
        </ul>
      </div>
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
  </div>
</template>
