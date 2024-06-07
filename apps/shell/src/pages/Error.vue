<script setup lang="ts">
let timer: Timer

onMounted(() => {
  const isDev = import.meta.env.DEV
  if (!isDev)
    return

  const router = useRouter()
  timer = setInterval(() => {
    router.push('/')
  }, 500)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="py-10 px-5 text-5xl">
    There is error
  </div>
</template>
