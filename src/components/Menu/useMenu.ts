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
    console.log(route)
    const path = computed(() => {
      return route?.path || '/'
    })
    const filterMenus = filterAndOrderMenus(menus)
    return filterMenus.find((item) => item.path === path.value)?.children || []
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`
  }

  return {
    generateMenuKeys,
    getTopMenus,
    getSubMenus,
    getIndex
  }
}