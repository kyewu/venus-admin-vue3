import type { AppRouteMenuItem } from "./types";

export function useMenu() {
  function generateMenuKeys(menus: AppRouteMenuItem[], level = '1') {
    const filterMenus = menus.filter(item => !item.meta?.hidden).sort((a, b) => {
      return (a.meta?.order || 100) - (b.meta?.order || 100)
    })
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

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`
  }

  return {
    generateMenuKeys,
    getIndex
  }
}