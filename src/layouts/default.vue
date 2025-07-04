<template>
  <div class="w-full h-screen overflow-hidden flex flex-nowrap flex-row">
    <div v-if="settings.settings?.mode !== 'top'" :style="{ width: mixMenuWidth, backgroundColor: menuBgColor }" class="h-full">
      <el-row class="h-full flex-col">
        <el-scrollbar v-if="settings.settings?.mode !== 'mix'" :class="[settings.settings?.mode !== 'mixbar' ? 'flex-1' : 'w-[64px]']" :height="'h-full'"
          :style="{ backgroundColor: settings.settings?.mode === 'mixbar' ? darken(menuBgColor, 0.1) : menuBgColor }"
          view-class="h-full">
          <Menu :class="['h-full', { 'mixbar': settings.settings?.mode === 'mixbar' }]" :data="mixMenus" :mode="mode"
            :collapse="settings.settings?.mode !== 'mixbar' && collapse" text-color="#b8b8b8"
            :background-color="settings.settings?.mode === 'mixbar' ? 'transparent' : menuBgColor"></Menu>
        </el-scrollbar>
        <el-scrollbar v-if="settings.settings?.mode === 'mixbar' || settings.settings?.mode === 'mix'"
          :height="'h-full'" view-class="h-full">
          <Menu :data="subMenus" :mode="mode" :collapse="collapse" text-color="#b8b8b8" class="h-full"
            :background-color="darken(menuBgColor, 0.1)"></Menu>
        </el-scrollbar>
      </el-row>
    </div>
    <div class="content flex-1">
      <Header :locales="locales" :username="username" :src="avatar" :data="avatarMenu" v-model:collapse="collapse"
        @themeSettingsChange="handleThemeChange">
        <Menu v-if="settings.settings?.mode === 'top' || settings.settings?.mode === 'mix'" :data="headerMenus"
          mode="horizontal" :collapse="collapse" class="h-full" :background-color="menuBgColor"></Menu>
          {{ $t('hello') }}
      </Header>
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
import { useMenu } from '@/components/Menu/useMenu';
import { darken } from '@/utils'

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


const { mode, collapse, avatar, avatarMenu, username, locales } = toRefs(settings)
const { getTopMenus, getSubMenus } = useMenu()

const menus = computed(() => generateMenus(routes))

const topMenus = computed(() => {
  return getTopMenus(menus.value)
})

const mixMenus = computed(() => {
  return settings.settings?.mode === 'mixbar' || settings.settings?.mode === 'mix' ? getTopMenus(menus.value) : menus.value
})

const subMenus = computed(() => {
  return getSubMenus(menus.value)
})

const headerMenus = computed(() => {
  return settings.settings?.mode !== 'top' && settings.settings?.mode === 'mix' ? topMenus.value : menus.value
})

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
  settings.settings = themeSettings
}

const menuBgColor = computed(() => {
  return settings.settings ? settings.settings.backgroundColor : 'var(--el-menu-bg-color)'
})

const menuWidth = computed(() => {
  return settings.settings ? settings.settings.menuWidth : 240
})

const isFullIcons = computed(() => {
  return settings.settings?.mode === 'mixbar' && subMenus.value.every((item) => !!item.meta?.icon)
})

const mixMenuWidth = computed(() => {
  if (settings.settings?.mode === 'mixbar' && isFullIcons.value) {
    return settings?.collapse ? 'auto' : menuWidth.value
  }
  return settings?.collapse ? '64px' : menuWidth.value + 'px'
})

</script>

<style lang="scss" scoped>
.mixbar {

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: auto;
    line-height: unset !important;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 4px 0 !important;

    svg {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>