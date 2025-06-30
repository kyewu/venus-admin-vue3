<template>
  <el-menu :default-active="defaultActive" :style="{ '--el-menu-bg-color': backgroundColor }" :mode="mode" @select="handleSelect">
    <SubMenu v-for="(data, index) in filterData" :key="index" :data="data" v-bind="subMenuProps"></SubMenu>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuProps as ElMenuProps, SubMenuProps } from 'element-plus'
import type { AppRouteMenuItem, IconOptions } from './types';
import { useMenu } from './useMenu';

interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[],
  subMenuProps: SubMenuProps,
  iconProps?: Partial<IconOptions>
}

const props = withDefaults(defineProps<Partial<MenuProps>>(), {
  data: () => [],
  mode: 'horizontal',
  defaultActive: '1',
  iconProps: () => ({ style: { fontSize: '20px' }, class: 'mr-3' }),
  backgroundColor: 'transparent'
})

provide('iconProps', props.iconProps)

const { generateMenuKeys } = useMenu()

const filterData = computed(() => generateMenuKeys(props.data))
const handleSelect = (index: string, indexPath: string[]) => {
  console.log('index-indexPath: ', index, indexPath)
}
</script>

<style scoped></style>