<template>
  <div class="position-absolute left-0 top-0 w-full h-full overflow-hidden flex" :style="{ '--el-color-primary': settings?.settings?.theme, '--el-menu-active-color': settings?.settings?.theme }">
    <div v-if="settings.settings?.mode !== 'top'" :style="{ width: mixMenuWidth, backgroundColor: menuBgColor }"
      class="h-full shrink-0">
      <el-row class="h-full">
        <el-scrollbar v-if="settings.settings?.mode !== 'mix'"
          :class="[settings.settings?.mode !== 'mixbar' ? 'flex-1' : 'w-[64px]']" :height="'h-full'"
          :style="{ backgroundColor: settings.settings?.mode === 'mixbar' ? darken(menuBgColor, 0.2) : menuBgColor }"
          view-class="h-full">
          <Menu :class="['h-full', { 'mixbar': settings.settings?.mode === 'mixbar' }]" :data="mixMenus" :mode="mode"
            :collapse="settings.settings?.mode !== 'mixbar' && collapse" text-color="#b8b8b8"
            :background-color="settings.settings?.mode === 'mixbar' ? 'transparent' : menuBgColor"
            @select="handleSelect"></Menu>
        </el-scrollbar>
        <el-scrollbar v-if="settings.settings?.mode === 'mixbar' || settings.settings?.mode === 'mix'"
          class="flex-1" view-class="h-full">
          <Menu :data="subMenus" :mode="mode" :collapse="collapse" text-color="#b8b8b8" class="h-full"
            :background-color="settings.settings?.backgroundColor" @select="handleSelect"></Menu>
        </el-scrollbar>
      </el-row>
    </div>
    <div class="content w-full h-full flex-1 overflow-hidden">
      <Header :locales="locales" :show-collapse="settings.settings?.mode !== 'top'" :username="username" :src="avatar" :data="avatarMenu" v-model:collapse="collapse"
        @themeSettingsChange="handleThemeChange">
        <Menu v-if="settings.settings?.mode === 'top' || settings.settings?.mode === 'mix'" :data="headerMenus"
          mode="horizontal" :collapse="collapse" class="h-full" :background-color="menuBgColor" @select="handleSelect">
        </Menu>
      </Header>
      <div class="overflow-y-auto h-full">
        <router-view></router-view>
      </div>
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
  showCollapse: true,
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
  console.log('subMenus:', getSubMenus(menus.value))
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
  if(settings.settings) {
    return settings.settings.backgroundColor
  }
  return 'var(--el-menu-bg-color)'
})

const menuWidth = computed(() => {
  return settings.settings ? settings.settings.menuWidth : 240
})

const isFullIcons = computed(() => {
  return settings.settings?.mode === 'mixbar' && subMenus.value.every((item) => !!item.meta?.icon)
})

const mixMenuWidth = computed(() => {
  if (settings.settings?.mode === 'mixbar' && isFullIcons.value) {
    return settings?.collapse ? 'auto' : menuWidth.value! + 64 + 'px'
  }
  if(settings.settings?.mode === 'mixbar' && settings?.collapse) {
    return 128 + 'px'
  }
  return settings?.collapse ? '64px' : menuWidth.value + 'px'
})

const router = useRouter()
const handleSelect = (item: AppRouteMenuItem) => {
  if(item.name) {
    router.push(item.name as string)
  }
}

useResizeObserver(document.body, (entries) => {
  const { width } = entries[0].contentRect
  if(width < 640) {
    settings.collapse = true
  }
  if(width > 1200) {
    settings.collapse = false
  }
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
    span{
      text-align: center;
    }
    svg {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
