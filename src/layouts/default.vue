<template>
  <div class="w-full h-screen overflow-hidden flex flex-nowrap flex-row">
    <div class="h-full"
      :style="{ width: menuWidth + 'px' }">
      <el-scrollbar :height="'h-full'" view-class="h-full">
        <Menu :data="menus" :mode="mode" class="h-full" :background-color="menuBgColor"></Menu>
      </el-scrollbar>
    </div>
    <div class="content flex-1">
      <Header :collapse="collapse" :locales="locales" :username="username" :src="avatar"
        :data="avatarMenu" @themeSettingsChange="handleThemeChange"></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AppRouteMenuItem } from '@/components/Menu/types';
import type { RouteRecordRaw } from 'vue-router';
import Header from '@/components/Layouts/Header.vue';
import { routes } from 'vue-router/auto-routes';
import type { DropDownMenuItem } from '@/components/Avatar/types';
import type { HeaderProps } from '@/components/Layouts/types';
import type { ThemeSettingsProps } from '@/components/Themes/types';

interface ThemeSettingOptions extends HeaderProps {
  mode: 'vertical' | 'horizontal';
  username: string,
  avatar: string,
  avatarMenu: DropDownMenuItem[]
}

const settings = reactive<ThemeSettingOptions>({
  mode: 'vertical',
  collapse: false,
  avatar: '',
  avatarMenu: [],
  username: 'Kye',
  locales: [
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
  ]
})

const {mode, collapse,avatar, avatarMenu, username, locales } = toRefs(settings)

const menus = computed(() => generateMenus(routes))

function generateMenus(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
  const menuData: AppRouteMenuItem[] = []

  routes.forEach((route) => {
    if (route.meta?.hidden) return
    const menuItem: AppRouteMenuItem = {
      path: route.path,
      name: route.name || '',
      meta: route.meta,
      alias: route.alias,
      component: route.component
    }
    if (route.children?.length && Array.isArray(route.children)) {
      menuItem.children = generateMenus(route.children)
    }
    menuData.push(menuItem)
  })
  return menuData
}

const handleThemeChange = (themeSettings: ThemeSettingsProps): void => {
  console.log('themeSettings:',themeSettings)
  settings.settings = themeSettings
}

const menuWidth = computed(() => {
  return settings.settings? settings.settings.menuWidth : 240
})
const menuBgColor = computed(() => {
  return settings.settings ? settings.settings.backgroundColor : '#001529'
})
</script>