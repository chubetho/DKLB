import { acceptHMRUpdate, defineStore } from 'pinia'
import { onMounted, ref, shallowRef } from 'vue'

export const useTicketStore = defineStore('ticket', () => {
  const prognosises = ref<number[]>([])
  const local = shallowRef<number[]>([])

  onMounted(() => {
    const savedPrognosises = localStorage.getItem('prognosises')
    if (savedPrognosises) {
      prognosises.value = JSON.parse(savedPrognosises)
      local.value = prognosises.value
    }
  })

  const save = () => {
    const sorted = prognosises.value.toSorted((a, b) => a - b)
    local.value = sorted
    localStorage.setItem('prognosises', JSON.stringify(sorted))
  }
  return {
    prognosises,
    local,
    save,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot))
