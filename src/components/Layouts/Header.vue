<template>
  <el-row :class="['flex items-center flex-nowrap! h-[50px] z-100 bg-white dark:bg-dark']">
    <Iconify
      :icon="collapseModel ? 'ep:expand' : 'ep:fold'"
      class="ml-2 text-2xl cursor-pointer"
      @click="collapseModel = !collapseModel"
      v-if="settings?.mode !== 'top'"
      v-show="showCollapse"
    ></Iconify>
    <VBreadcrumb v-if="['top', 'mix'].includes(settings?.mode || '')"></VBreadcrumb>
    <div class="relative flex-grow overflow-x-hidden">
      <slot></slot>
    </div>
    <el-row class="items-center flex-nowrap!">
      <ThemeSettings v-bind="settings" @change="handleThemeChange"></ThemeSettings>
      <DarkModeToggle class="mr-2" :dark="settings?.darkMode" @change="handleDarkChange"></DarkModeToggle>
      <ChangeLocale class="mr-2" :locales="locales" @change="handleLocalesChange"></ChangeLocale>
      <FullScreen></FullScreen>
      <el-divider direction="vertical" />
      <AvatarMenu v-if="src || username" v-bind="avatarProps" @command="handleCommand"></AvatarMenu>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import Iconify from '../Icon/Iconify.vue';
import VBreadcrumb from '../Themes/VBreadcrumb.vue';
import DarkModeToggle from '../Themes/DarkModeToggle.vue';
import FullScreen from '../Themes/FullScreen.vue';
import ChangeLocale from '../Themes/ChangeLocale.vue';

import ThemeSettings from '../Themes/ThemeSettings.vue';
import type { HeaderProps } from './types';
import type { ThemeSettingsProps } from '../Themes/types';
import { loadLocaleMessages } from '@/modules/i8n';

const props = withDefaults(defineProps<HeaderProps>(), {
  collapse: false,
  showCollapse: true
})
const collapseModel = defineModel<boolean>('collapse', { default: false })
const localSettings = reactive({ ...props })
const emits = defineEmits<{
  command: [arg: string | number | object],
  themeSettingsChange: [settings: ThemeSettingsProps],
}>()
const avatarProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collapse, locales, ...restProps } = props
  return restProps
})

watch(() => localSettings.settings, () => {
  if (localSettings.settings) {
    emits('themeSettingsChange', localSettings.settings)
  }
}, {
  deep: true
})

const handleCommand = (command: string | number | object) => {
  emits('command', command)
}

const handleThemeChange = (themeSettings: ThemeSettingsProps) => {
  localSettings.settings = themeSettings
}
const handleDarkChange = (darkMode: boolean) => {
  if (localSettings.settings) {
    localSettings.settings.darkMode = darkMode
  }
}

const handleLocalesChange = (locales: string) => {
  loadLocaleMessages(locales)
}
</script>

<style scoped></style>
