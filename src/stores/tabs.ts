import type { AppRouteMenuItem } from '@/components/Menu/types'
import type { TabPaneName } from 'element-plus'
import { defineStore } from 'pinia'
export const useTabsStore = defineStore('tabs',{
  state: () => (
    {
      tabs: [] as AppRouteMenuItem[],
      current: ''
    }
  ),
  actions: {
    addTab(route: AppRouteMenuItem) {
      if (!this.tabs.some(t => t.name === route.name)) {
        this.tabs.push({...route})
      }
    },
    removeTab(name: TabPaneName) {
      this.tabs = this.tabs.filter(t => t.name !== name)
      if (this.current === name) {
        this.current = this.tabs.length > 0 ? this.tabs[0].name as string : ''
      }
    }
  },
  persist: true
})
