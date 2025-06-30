<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

definePage({
  meta: {
    title: 'Home',
    icon: 'ep:home-filled',
  }
})

onMounted(() => {
  useRegisterSW({
    immediate: true,
    onRegisteredSW(swScriptUrl, registration) {
      console.log('swScriptUrl:', swScriptUrl)
      console.log('registration:', registration)
      setInterval(() => {
        if (registration) {
          registration.update()
        }
      }, 5000)
    },
  })
})
</script>

<style scoped lang="scss"></style>
  
