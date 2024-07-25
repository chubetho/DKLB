<script setup lang="ts">
import { UiButton, useDialog } from '@dklb/ui'
import { GLOBAL_STATE_KEY } from '@dklb/utils'
import { type Ref, defineAsyncComponent, h, inject } from 'vue'
import { useTicketStore } from '../stores/ticket'
import Layout from '../components/Layout.vue'
import MdiCheck from '~icons/mdi/check'
import MdiReload from '~icons/mdi/reload'
import MdiTrashOutline from '~icons/mdi/trash-outline'

const LottoNumbers = defineAsyncComponent(() => import('home_app/LottoNumbers'))

const store = useTicketStore()

const { open, close } = useDialog({
  attrs: {
    title: 'SERVICE-INFO',
    onClose() {
      close()
    },
  },
  slots: {
    default: () => h('p', { class: 'mb-3 text-[#707070]' }, 'Bitte setzen Sie genau 6 Kreuze.') as any,
  },
})

function choose(n: number) {
  const index = store.prognosises.indexOf(n)

  if (store.prognosises.length === 6 && index === -1) {
    open()
    return
  }

  if (index !== -1) {
    store.prognosises.splice(index, 1)
    return
  }

  store.prognosises.push(n)
}

function random() {
  store.prognosises = []
  const set = new Set<number>()
  while (set.size < 6) {
    set.add(Math.floor(Math.random() * 49) + 1)
  }
  store.prognosises = Array.from(set)
}

function reset() {
  store.prognosises = []
}

function confirm() {
  if (!store.prognosises.length) {
    store.save()
    return
  }

  if (store.prognosises.length !== 6) {
    open()
    return
  }

  store.save()
}

const logs = inject<Ref<string[]>>(GLOBAL_STATE_KEY)
console.log('Log from lotto /normalschein:', logs?.value)
</script>

<template>
  <Layout>
    <div class="bg-white">
      <h1 class="text-4xl mb-5 text-center">
        Normalschein
      </h1>

      <p class="text-center mb-5">
        Saved {{ store.local }}
      </p>

      <div class="flex flex-col flex-center">
        <div class="space-y-3">
          <p class="text-primary text-lg text-center">
            Wählen Sie 6 aus 49 Zahlen
          </p>

          <ul class="grid grid-cols-7 grid-rows-7 max-w-[350px] gap-2">
            <template v-for="i in 49" :key="i">
              <li
                class="relative rounded-sm w-10 h-10 border border-red-500 flex flex-center text-xl cursor-pointer"
                @click="choose(i)"
              >
                {{ i }}

                <template v-if="store.prognosises.includes(i)">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-[3px] bg-primary rotate-45" />
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-[3px] bg-primary -rotate-45" />
                </template>
              </li>
            </template>
          </ul>

          <ul class="flex items-center gap-3 w-full">
            <li class="basis-1/3">
              <UiButton class="w-full" variant="secondary" @click="random">
                <MdiReload class="scale-95" />
              </UiButton>
            </li>
            <li class="basis-1/3">
              <UiButton class="w-full" variant="secondary" @click="reset">
                <MdiTrashOutline />
              </UiButton>
            </li>
            <li class="basis-1/3">
              <UiButton class="w-full" @click="confirm">
                <MdiCheck />
              </UiButton>
            </li>
          </ul>
        </div>

        <LottoNumbers class="pt-10" />
      </div>
    </div>
  </Layout>
</template>
