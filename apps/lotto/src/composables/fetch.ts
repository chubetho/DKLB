import { computed, shallowRef, watch } from 'vue'
import { useDateFormat } from '@vueuse/core'
import type { App } from '@dklb/api'
import { useApi } from './api'

type Routes = App['_routes']
type Game = Routes['getDrawYears']['get']['query']['game']
type Draw = Routes['getLottoNumberDrawsForYear']['get']['response']['200'][0]

export function useFetchGcKey(game: Game) {
  const api = useApi()

  const years = shallowRef<string[]>([])
  const draws = shallowRef<Draw[]>([])
  const year = shallowRef<string>()
  const draw = shallowRef<Draw>()
  const key = shallowRef<string>()

  const drawOpts = computed(() => {
    if (!draws.value)
      return []

    return draws.value.map(({ eventDate, key: value }) => {
      const label = useDateFormat(eventDate, 'dddd, DD.MM.', { locales: 'de' }).value
      return { label, value }
    })
  },
  )

  const yearsOpts = computed(() => years.value.map(year => ({ label: year, value: year })))

  fetchYears()

  async function fetchYears() {
    const _years = await getYears()
    if (!_years?.length)
      return

    years.value = _years.map(String)
    year.value = years.value[0]
    year.value && await fetchDraws(year.value)

    watch(year, y => y && fetchDraws(y))
  }

  async function fetchDraws(year: string) {
    const _draws = await getDraws(year)
    if (!_draws?.length)
      return

    draws.value = _draws
    draw.value = _draws[0]
    key.value = draw.value?.key
  }

  async function getYears() {
    const { data } = await api.getDrawYears.get({ query: { game, from: '2013' } })
    return data?.years ?? []
  }

  async function getDraws(year: string) {
    const fn = (() => {
      switch (game) {
        case 'lotto': return api.getLottoNumberDrawsForYear
        case 'eurojackpot': return api.getEurojackpotNumberDrawsForYear
        case 'gluecksspirale': return api.getGluecksspiraleNumberDrawsForYear
        case 'keno': return api.getKenoNumberDrawsForYear
        case 'totoew': return api.getTotoEwNumberDrawsForYear
        case 'totoaw': return api.getTotoAwNumberDrawsForYear
      }
    })()
    const { data } = await fn.get({ query: { year } })
    return data
  }

  return { year, key, drawOpts, yearsOpts }
}
