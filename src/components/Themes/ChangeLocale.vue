<template>

  <el-dropdown trigger="click" @command="changeLocale">
    <slot name="trigger">
      <span class="el-dropdown-link">
        <Iconify :icon="`ion:language`" class="text-xl"></Iconify>
      </span>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(locale, index) in locales" :key="index" :command="locale.name">
          <Iconify v-if="locale.icon" :icon="locale.icon" class="mr-2 text-xl"></Iconify>
          {{ locale.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="tsx">

import Iconify from '../Icon/Iconify.vue';
import type { ChangeLocaleProps } from './types';



defineProps<ChangeLocaleProps>()

const changeLocale = (name: string) => {
  console.log(name)
}

// const dropdownItemIcon = (icon?: IconifyIcon | string) => {
//   if(!icon) return () => {}
//   return () => {
//     return <Iconify icon={icon}></Iconify>
//   }
// }
</script>

<style scoped></style>