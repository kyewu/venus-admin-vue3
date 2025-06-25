<template>
  <el-menu :default-active="defaultActive" :mode="mode" @select="handleSelect">
    <SubMenu v-for="(data, index) in filterData" :key="index" :data="data" v-bind="subMenuProps"></SubMenu>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuProps as ElMenuProps, SubMenuProps } from 'element-plus'
import type { AppRouteMenuItem } from './types';
import { useMenu } from './useMenu';

interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[],
  subMenuProps: SubMenuProps
}

const props = withDefaults(defineProps<Partial<MenuProps>>(), {
  data: () => [
    {
      path: '1',
      name: 'Menu',
      meta: { title: 'Menu' },
      children: [
        { path: '1-1', name: 'Menu1-1', meta: { title: 'Menu1-1' } },
        { path: '1-2', name: 'Menu1-2', meta: { title: 'Menu1-2' } }
      ]
    },
    {
      path: '2',
      name: 'Menu2',
      meta: { title: 'Menu2', icon: 'ep:menu' },
    }
  ],
  mode: 'horizontal',
  defaultActive: '1'
})

const { generateMenuKeys } = useMenu()

const filterData = computed(() => generateMenuKeys(props.data))
const handleSelect = (index: string, indexPath: string[]) => {
  console.log('index-indexPath: ', index, indexPath)
}
</script>

<style scoped></style>