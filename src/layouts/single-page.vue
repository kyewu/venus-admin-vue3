<template>
  <div class="w-screen h-screen overflow-hidden">
    <div class="position-fixed top-0 right-10 flex items-center">
      <DarkModeToggle class="mr-2" :dark="darkMode" @change="handleDarkChange"></DarkModeToggle>
      <ChangeLocale class="mr-2" :locales="locales" @change="handleLocalesChange"></ChangeLocale>
    </div>
    <div v-if="bg" class="bg-center bg-cover w-full lg:w-1/2 h-screen position-absolute left-0 top-0 z--1" :style="{ backgroundImage: `url(${bg})` }"></div>
    <div class="flex flex-col items-center justify-center h-full mx-60">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i8n';

const route = useRoute()
const bg = ref('')

onBeforeMount(() => {
  if(route.meta?.backgroundImage) {
    bg.value = route.meta.backgroundImage as string
  }
})

const locales = reactive([
  {
    text: '中文',
    icon: 'uil:letter-chinese-a',
    name: 'zh-CN'
  },
  {
    text: 'English',
    icon: 'ri:english-input',
    name: 'en'
  }
])
const darkMode = ref(false)

const handleDarkChange = (isDarkMode: boolean) => {
  darkMode.value = isDarkMode
}
const handleLocalesChange = (locales: string) => {
  loadLocaleMessages(locales)
}
</script>

<style scoped></style>