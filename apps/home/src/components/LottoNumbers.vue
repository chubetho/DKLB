<script setup lang="ts">
import { UiButton, UiSelect, UiSeparator } from '@dklb/ui'
import type { App } from '@dklb/api'
import { useFetchGcKey } from '../composables/fetch'

const api = useApi()
const { year, key, drawOpts, yearsOpts } = useFetchGcKey('lotto')
const result = shallowRef<App['_routes']['getLottoHistoricNumbers']['get']['response']['200'] | null>(null)

watch(key, (gckey) => {
  if (gckey) {
    api.getLottoHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      result.value = data
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-[30px]">
      <IconLotto6aus49 class="max-w-[200px] max-h-[30px] fill-[#707070]" />
    </div>

    <UiSeparator class="bg-[#707070] h-[2px]" />

    <div class="flex items-center mb-5">
      <span class="mr-4">Ziehung vom:</span>
      <UiSelect v-model="key" :options="drawOpts" class="mr-6 w-[200px]" />
      <UiSelect v-model="year" :options="yearsOpts" class="w-[110px]" />
    </div>

    <template v-if="result">
      <ul class="flex items-start gap-6">
        <li>
          <ul class="flex gap-1.5">
            <li
              v-for="n in result.numbersInNaturalOrder"
              :key="n"
              class="w-10 h-10 bg-white rounded-full flex-center text-lg"
            >
              {{ n }}
            </li>
          </ul>
        </li>
        <li>
          <div class="flex flex-col items-center">
            <span class="w-10 h-10 rounded-full bg-[#707070] text-white flex-center text-xl">
              {{ result.superZahl }}
            </span>
            <span class="text-sm">Superzahl</span>
          </div>
        </li>
      </ul>
    </template>

    <div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-auto">
      <div />

      <UiButton variant="outline" class="w-full" to="/lotto6aus49/quoten">
        Quoten <MdiChevronRight />
      </UiButton>

      <UiButton class="w-full" disabled>
        Gewinnprüfung <MdiChevronRight />
      </UiButton>

      <UiButton class="w-full" to="/lotto6aus49/normalschein">
        Jetzt Spielen <MdiChevronRight />
      </UiButton>
    </div>
  </div>
</template>
