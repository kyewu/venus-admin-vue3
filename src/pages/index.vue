<template>
  <Menu class="el-menu w-[200px] min-h-[400px] h-full" :mode="mode"></Menu>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { LayoutDirection } from 'element-plus'
const mode: LayoutDirection = 'vertical'

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
  
