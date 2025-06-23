<template>
  <div class="mb-4">
    <DarkModeToggle :isDark="isDark" />
    <FullScreen />
    <component :is="Icon" :icon="iconRef"></component>
    <el-button>Default</el-button>
    <SvgIcon name="icon-xuehua"></SvgIcon>
    <p>{{ $t('hello') }}</p>
    <select v-model="locale">
      <option value="zh-CN">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { Icon, loadIcons } from '@iconify/vue'
import json from '@iconify/json/json/mdi.json'
import { loadLocaleMessages } from '@/modules/i8n'

const count = ref(0)
console.log(count.value)
const isDark = ref(false)
const iconRef = ref()
const iconNamesArr = Object.keys(json.icons)
const locale = ref('zh-CN')
onBeforeMount(async () => {
  await loadIcons(iconNamesArr.map((item) => `${json.prefix}:${item}`))
})

watch(locale, async () => {
  await loadLocaleMessages(locale.value)
})

onMounted(() => {
  setInterval(() => {
    const index = Math.floor(Math.random() * 10)
    iconRef.value = `${json.prefix}:${iconNamesArr[index]}`
  }, 1000);
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
