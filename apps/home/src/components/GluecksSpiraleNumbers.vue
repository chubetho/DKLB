<script setup lang="ts">
import { UiButton, UiSelect, UiSeparator } from '@dklb/ui'
import type { App } from '@dklb/api'
import { useFetchGcKey } from '../composables/fetch'

const api = useApi()
const { year, key, drawOpts, yearsOpts } = useFetchGcKey('gluecksspirale')
const result = shallowRef<App['_routes']['getGluecksspiraleHistoricNumbers']['get']['response']['200'] | null>(null)

watch(key, (gckey) => {
  if (gckey) {
    api.getGluecksspiraleHistoricNumbers.get({ query: { gckey } }).then(({ data }) => {
      result.value = data
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-[30px]">
      <IconGluecksSpiraleMono class="max-w-[200px] max-h-[30px] fill-[#707070]" />
    </div>

    <UiSeparator class="bg-[#707070] h-[2px]" />

    <div class="flex items-center mb-5">
      <span class="mr-4">Ziehung vom:</span>
      <UiSelect v-model="key" :options="drawOpts" class="mr-6 w-[200px]" />
      <UiSelect v-model="year" :options="yearsOpts" class="w-[110px]" />
    </div>

    <div v-if="result" class="grid grid-cols-2 gap-8">
      <div class="space-y-2">
        <p class="font-bold text-lg">
          GluecksSpirale
        </p>
        <ul class="text-sm/6">
          <li
            v-for="([k, v]) in Object.entries<string[]>(result.gluecksSpiraleNumbers)"
            :key="k"
            class="flex border-b border-[#bebdbd]"
          >
            <span class="mr-auto shrink-0">GWK {{ k }}</span>
            <ul class="flex flex-wrap">
              <li
                v-for="(n, i) in v" :key="i"
                class="basis-full tracking-[.4vw] text-right"
              >
                {{ n }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="space-y-2">
        <p class="font-bold text-lg">
          Die Sieger-Chance
        </p>
        <ul class="text-sm/6">
          <li
            v-for="([k, v]) in Object.entries<string[]>(result.siegerChanceNumbers)"
            :key="k"
            class="flex border-b border-[#bebdbd]"
          >
            <span class="mr-auto shrink-0">GWK {{ k }}</span>
            <ul class="flex flex-wrap">
              <li
                v-for="(n, i) in v" :key="i"
                class="basis-full tracking-[.5vw] text-right"
              >
                {{ n }}
              </li>
            </ul>
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
