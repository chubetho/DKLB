<script setup lang="ts">
import { UiSeparator } from '@dklb/ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = computed(() => router.getRoutes().sort((a, b) => a.path.length - b.path.length))
</script>

<template>
  <div class="p-5 space-y-5">
    <ul class="flex items-center flex-wrap gap-5">
      <li v-for="r in routes" :key="r.path">
        <RouterLink :to="r.path" class="block rounded-md" active-class="border border-primary">
          <div class="px-4 py-2 rounded-md border">
            {{ r.path }}
          </div>
        </RouterLink>
      </li>
    </ul>

    <UiSeparator />

    <div>
      <slot />
    </div>
  </div>
</template>
