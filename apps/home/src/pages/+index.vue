<script setup lang="ts">
type Type = (typeof types)[number]['value']

const types = [
  { value: 'lotto', label: 'LOTTO 6aus49' },
  { value: 'eurojackpot', label: 'EUROJACKPOT' },
  { value: 'gluecksspirale', label: 'GluecksSpirale' },
  { value: 'keno', label: 'KENO' },
  { value: 'toto', label: 'TOTO' },
] as const

const type = ref<Type>('lotto')
</script>

<template>
  <Layout>
    <section class=" bg-[#efefef] grid grid-cols-2">
      <div class="h-full p-10 ">
        <h2 class="text-2xl uppercase text-[#707070] font-medium mb-12">
          Gewinnzahlen & Quoten
        </h2>

        <ul class="-mx-10">
          <li
            v-for="{ label, value } in types" :key="value"
            class="px-10 type"
            :class="{ 'active bg-[#e6e6e6]': value === type }"
            role="button"
            @click="() => type = value"
          >
            <div
              class="grow flex justify-between items-center border-[#c7c6c6] border-b h-[45px]"
              :class="{ 'border-b-0': value === type }"
            >
              <span
                class="text-lg transition-[font-weight]"
                :class="{ 'font-bold': value === type }"
              >
                {{ label }}
              </span>

              <MdiChevronRight v-if="value !== type" class="text-[#d22321] text-3xl" />
            </div>
          </li>
        </ul>

        <p class="text-sm mt-2 text-right">
          Alle Angaben ohne Gewähr.
        </p>
      </div>

      <div class="p-10 bg-[#e6e6e6] min-h-[575px]">
        <template v-if="type === 'lotto'">
          <LottoNumbers />
        </template>
        <template v-if="type === 'eurojackpot'">
          <EurojackpotNumbers />
        </template>
        <template v-if="type === 'gluecksspirale'">
          <GluecksSpiraleNumbers />
        </template>
        <template v-if="type === 'keno'">
          <KenoNumbers />
        </template>
        <template v-if="type === 'toto'">
          <TotoNumbers />
        </template>
      </div>
    </section>
  </Layout>
</template>

<style scoped>
.type:has(+ .active)>div{
  border-bottom: 0;
}
</style>
