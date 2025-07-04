import type { AppRouteMenuItem } from "./types";
import { useRoute } from "vue-router";

export function useMenu() {

  function filterAndOrderMenus(menus: AppRouteMenuItem[]) {
    menus.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.children = filterAndOrderMenus(item.children)
      }
      item.meta = {
        ...item.meta,
        order: item.meta?.order ?? 100
      }
    })

    return menus
      .filter((m) => !m.meta?.hideMenu)
      .sort((a, b) => {
        const orderA = a.meta?.order ?? 100
        const orderB = b.meta?.order ?? 100
        return orderA - orderB
      })
      .map((item) => ({ ...item }))
  }

  function generateMenuKeys(menus: AppRouteMenuItem[], level = '1') {
    const filterMenus = filterAndOrderMenus(menus)
    filterMenus.forEach((item, i) => {
      const key = level.indexOf('-') === -1 ? `${i + 1}` : `${level}-${i + 1}`
      item.meta = {
        ...item.meta,
        key
      }

      if (item.children?.length) {
        return (item.children = generateMenuKeys(item.children, `${key}-`))
      }
    })
    return filterMenus
  }

  function getTopMenus(menus: AppRouteMenuItem[]) {
    const filterMenus = filterAndOrderMenus(menus)
    return filterMenus.filter((item) => {
      delete item.children
      return item
    })
  }

  function getSubMenus(menus: AppRouteMenuItem[]) {
    const route = useRoute()
    const path = computed(() => {
      if(route.path === '/') return '/'
      const rootPath = route.path.split('/')[1]
      return rootPath ? `/${rootPath}` : '/'
    })
    const filterMenus = filterAndOrderMenus(menus)
    return filterMenus.find((item) => item.path === path.value)?.children || []
  }

  function getItemCondition(menus: AppRouteMenuItem[], fn: (item: AppRouteMenuItem) => boolean) {
    for (let i = 0; i < menus.length; i++) {
      if (fn(menus[i])) {
        return menus[i]
      } else {
        if (menus[i].children && Array.isArray(menus[i].children)) {
          const item = getItemCondition(menus[i].children!, fn) as AppRouteMenuItem | undefined
          if (item) {
            return item
          }
        }
      }
    }
  }

  // 获取当前需要open的子菜单信息
  function getParentMenu(menus: AppRouteMenuItem[]): AppRouteMenuItem | undefined {
    const route = useRoute()
    if (!route) {
      return {} as AppRouteMenuItem
    }
    const path = computed(() => route.path)
    return getItemCondition(menus, (item) => {
      const arr = path.value.split('/')
      if (arr.length < 3) return false
      arr.pop()
      return arr.join('/') === item.name
    })
  }

  function getItem(menus: AppRouteMenuItem[], path: string) {
    return getItemCondition(menus, (item) => item.meta?.key === path)
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`
  }

  return {
    getParentMenu,
    getItem,
    generateMenuKeys,
    getTopMenus,
    getSubMenus,
    getIndex
  }
}