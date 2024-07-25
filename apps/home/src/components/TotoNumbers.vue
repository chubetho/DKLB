<script setup lang="ts">
import { UiButton, UiSelect, UiSeparator } from '@dklb/ui'
import { type App, useApi } from '@dklb/eden'
import { shallowRef, watch } from 'vue'
import { useFetchGcKey } from '../composables/fetch'
import IconToto from './icons/IconToto.vue'
import MdiChevronRight from '~icons/mdi/chevron-right'

const api = useApi()
const {
  year: yearEw,
  key: keyEw,
  drawOpts: drawEwOpts,
  yearsOpts: yearsEwOpts,
} = useFetchGcKey('totoew')
const resultEw = shallowRef<App['_routes']['getTotoEwHistoricNumbers']['get']['response']['200'] | null>(null)
watch(keyEw, (gckey) => {
  if (gckey) {
    api.getTotoEwHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      resultEw.value = data
    })
  }
})

const {
  year: yearAw,
  key: keyAw,
  drawOpts: drawAwOpts,
  yearsOpts: yearsAwOpts,
} = useFetchGcKey('totoaw')
const resultAw = shallowRef<App['_routes']['getTotoAwHistoricNumbers']['get']['response']['200'] | null>(null)
watch(keyAw, (gckey) => {
  if (gckey) {
    api.getTotoAwHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      resultAw.value = data
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-[30px]">
      <IconToto class="max-w-[200px] max-h-[30px] fill-[#707070]" />
    </div>

    <UiSeparator class="bg-[#707070] h-[2px]" />

    <div class="space-y-4">
      <template v-if="resultEw">
        <div class="flex items-center">
          <span class="mr-4">Ziehung vom:</span>
          <UiSelect v-model="keyEw" :options="drawEwOpts" class="mr-6 w-[200px]" />
          <UiSelect v-model="yearEw" :options="yearsEwOpts" class="w-[110px]" />
        </div>

        <div class="space-y-2">
          <p class="font-bold">
            TOTO 13er Ergebniswette
          </p>
          <ul class="flex gap-1">
            <li
              v-for="(n, i) in resultEw.numbersInDrawOrder"
              :key="i"
              class="w-8 h-8 bg-white rounded-full flex-center shrink-0"
            >
              {{ n }}
            </li>
          </ul>
          <div class="flex justify-end pb-2">
            <UiButton variant="outline" class="w-[223px]" disabled>
              Quoten <MdiChevronRight />
            </UiButton>
          </div>
        </div>
      </template>

      <template v-if="resultAw">
        <div class="flex items-center">
          <span class="mr-4">Ziehung vom:</span>
          <UiSelect v-model="keyAw" :options="drawAwOpts" class="mr-6 w-[200px]" />
          <UiSelect v-model="yearAw" :options="yearsAwOpts" class="w-[110px]" />
        </div>

        <div class="space-y-2">
          <p class="font-bold">
            TOTO 6aus45 Auswahlwette
          </p>
          <ul class="flex gap-1">
            <li
              v-for="(n, i) in resultAw.numbersInDrawOrder"
              :key="i"
              class="w-8 h-8 bg-white rounded-full flex-center shrink-0"
            >
              {{ n }}
            </li>
            <li class="flex flex-col items-center ml-2">
              <span class="w-8 h-8 bg-[#707070] text-white rounded-full flex-center shrink-0">
                {{ resultAw.additionalNumber }}
              </span>
              <span class="text-sm">Zusatzspiel</span>
            </li>
          </ul>
          <div class="flex justify-end mt-2 pb-4">
            <UiButton variant="outline" class="w-[223px]" disabled>
              Quoten <MdiChevronRight />
            </UiButton>
          </div>
        </div>
      </template>
    </div>

    <div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-auto">
      <UiButton class="w-full" disabled>
        Gewinnprüfung <MdiChevronRight />
      </UiButton>
      <div />
    </div>
  </div>
</template>
