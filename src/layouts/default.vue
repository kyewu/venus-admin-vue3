<template>
  <div class="w-full h-screen overflow-hidden flex flex-nowrap flex-row">
    <div class="h-full" :style="{ width: typeof menuWidth === 'number' ? `${menuWidth}px` : menuWidth }">
      <el-scrollbar :height="'h-full'" view-class="h-full">
        <Menu :data="menus" :mode="mode" class="h-full"></Menu>
      </el-scrollbar>
    </div>
    <div class="content flex-1">
      <Header :collapse="false" :locales="locales"></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AppRouteMenuItem } from '@/components/Menu/types';
import type { RouteRecordRaw } from 'vue-router';
import Header from '@/components/Layouts/Header.vue';
import { routes } from 'vue-router/auto-routes';
import type { LocaleItem } from '@/components/Themes/types';

interface ThemeSetting {
  mode: 'vertical' | 'horizontal';
  menuWidth: number | string;
  locales?: LocaleItem[]
}

withDefaults(defineProps<ThemeSetting>(), {
  mode: 'vertical',
  menuWidth: 200,
  locales: () => {
    return [
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
  }
})


const menus = computed(() => generateMenus(routes))
console.log(menus)

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
    if(route.children?.length && Array.isArray(route.children)) {
      menuItem.children = generateMenus(route.children)
    }
    menuData.push(menuItem)
  })
  return menuData
}
</script>