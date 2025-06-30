<template>
  <el-row class="items-center">
    <Iconify :icon="collapse ? 'ep:fold' : 'ep:expand'" class="text-2xl cursor-pointer ml-2"></Iconify>
    <div class="flex-grow"></div>
    <el-row class="items-center">
      <DarkModeToggle class="mr-2"></DarkModeToggle>
      <ChangeLocale class="mr-2" :locales="locales"></ChangeLocale>
      <FullScreen></FullScreen>
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import Iconify from '../Icon/Iconify.vue';
import DarkModeToggle from '../Themes/DarkModeToggle.vue';
import FullScreen from '../Themes/FullScreen.vue';
import ChangeLocale from '../Themes/ChangeLocale.vue';
import type { LocaleItem } from '../Themes/types';


interface HeaderProps {
  collapse: boolean,
  locales: LocaleItem[]
}

defineProps<HeaderProps>()
</script>

<style scoped></style>