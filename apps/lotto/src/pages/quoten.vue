<script setup lang="ts">
import { UiSelect } from '@dklb/ui'
import type { App } from '@dklb/api'
import { useFetchGcKey } from '../composables/fetch'
import { useApi } from '../composables/api'

const api = useApi()
const { year, key, drawOpts, yearsOpts } = useFetchGcKey('lotto')

const result = shallowRef<App['_routes']['getLottoHistoricOdds']['get']['response']['200'] | null>(null)
watch(key, (gckey) => {
  gckey && api.getLottoHistoricOdds.get({ query: { gckey } }).then(({ data }) => {
    result.value = data
  })
})

function formatNumber(n = 0) {
  const intl = new Intl.NumberFormat('de-DE')
  return intl.format(n)
}

function formatCurrency(n = 0) {
  const intl = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
  return intl.format(n)
}

function formatWinningClass(n = 0) {
  switch (n) {
    case 101:
      return '6 Richtige + Superzahl'
    case 102:
      return '6 Richtige'
    case 103:
      return '5 Richtige + Superzahl'
    case 104:
      return '5 Richtige'
    case 105:
      return '4 Richtige + Superzahl'
    case 106:
      return '4 Richtige'
    case 107:
      return '3 Richtige + Superzahl'
    case 108:
      return '3 Richtige'
    case 109:
      return '2 Richtige + Superzahl'
    default:
      return 'Unbekannt'
  }
}
</script>

<template>
  <Layout>
    <h1 class="text-2xl mb-4 font-medium uppercase">
      Quoten
    </h1>
    <p class="mb-2">
      Bitte wählen Sie das gewünschte Ziehungsdatum aus.
    </p>

    <div class="flex items-center mb-5">
      <UiSelect v-model="key" :options="drawOpts" class="mr-6 w-[200px]" />
      <UiSelect v-model="year" :options="yearsOpts" class="w-[110px]" />
    </div>

    <template v-if="result">
      <div>
        <table class="w-full">
          <colgroup>
            <col class="w-1/3">
            <col class="w-1/3">
            <col class="w-1/3">
          </colgroup>
          <thead class="border-b">
            <tr>
              <th class="text-left font-normal text-lg text-primary py-3">
                Gewinnklasse
              </th>
              <th class="text-right font-normal text-lg text-primary py-3">
                Anzahl der Gewinner
              </th>
              <th class="text-right font-normal text-lg text-primary py-3 pr-6">
                Gewinnquote
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="{ winningClass, numberOfWins, amount }, index in result.lottoOdds1"
              :key="index"
              class="odd:bg-[#f2f2f2]"
            >
              <td class="text-left py-3 px-6 text-sm">
                <span class="mr-6">{{ index + 1 }}</span>
                <span class="font-bold">({{ formatWinningClass(winningClass) }})</span>
              </td>
              <td class="text-right py-3 px-6 text-sm">
                {{ formatNumber(numberOfWins) }}
              </td>
              <td class="text-right py-3 px-6 text-sm">
                {{ formatCurrency(amount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        v-if="result.lottoTurnover[0]"
        class="text-sm mt-3"
      >
        <span class="mr-6">Spieleinsatz: {{ formatCurrency(result.lottoTurnover[0].amount) }} </span>
        <span>* Jackpot-Vortrag / max. Gewinnbetrag: 50 Mio. €</span>
      </p>
    </template>
  </Layout>
</template>
