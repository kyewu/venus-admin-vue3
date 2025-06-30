<template>
  <el-row class="items-center px-4">
    <Iconify :icon="collapse ? 'ep:fold' : 'ep:expand'" class="text-2xl cursor-pointer"></Iconify>
    <div class="flex-grow"></div>
    <el-row class="items-center">
      <ThemeSettings @change="handleThemeChange"></ThemeSettings>
      <DarkModeToggle class="mr-2"></DarkModeToggle>
      <ChangeLocale class="mr-2" :locales="locales"></ChangeLocale>
      <FullScreen></FullScreen>
      <el-divider direction="vertical" />
      <AvatarMenu v-if="src || username" v-bind="avatarProps" @command="handleCommand"></AvatarMenu>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import Iconify from '../Icon/Iconify.vue';
import DarkModeToggle from '../Themes/DarkModeToggle.vue';
import FullScreen from '../Themes/FullScreen.vue';
import ChangeLocale from '../Themes/ChangeLocale.vue';

import ThemeSettings from '../Themes/ThemeSettings.vue';
import type { HeaderProps } from './types';
import type { ThemeSettingsProps } from '../Themes/types';

const props = withDefaults(defineProps<HeaderProps>(), {
  collapse: false,
})
const emits = defineEmits<{
  command: [arg: string | number | object],
  themeSettingsChange: [settings: ThemeSettingsProps]
}>()
const avatarProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collapse, locales, ...restProps } = props
  return restProps
})

const handleCommand = (command: string | number | object) => {
  emits('command', command)
}

const handleThemeChange = (themeSettings: ThemeSettingsProps) => {
  emits('themeSettingsChange', themeSettings)
}
</script>

<style scoped></style>