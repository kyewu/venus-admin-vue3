<template>
  <div class="w-full h-screen overflow-hidden flex flex-nowrap flex-row">
    <div class="h-full" :style="{ width: typeof themeSetting.menuWidth === 'number' ? `${themeSetting.menuWidth}px` : themeSetting.menuWidth }">
      <el-scrollbar>
        <Menu :data="menus" :mode="themeSetting.mode"></Menu>
      </el-scrollbar>
    </div>
    <div class="content flex-1 bg-amber">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AppRouteMenuItem } from '@/components/Menu/types';
import type { RouteRecordRaw } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

interface ThemeSetting {
  mode: 'vertical' | 'horizontal';
  menuWidth: number | string;
}

const themeSetting = reactive<ThemeSetting>({
  mode: 'vertical',
  menuWidth: 200
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