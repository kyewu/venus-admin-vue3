<template>
  <el-menu
    ref="menuRef"
    :collapse="collapse"
    :style="{ '--el-menu-bg-color': backgroundColor }"
    :mode="mode"
    :default-active="getActive($route)"
    @select="handleSelect"
  >
    <SubMenu
      v-for="(data, index) in filterData"
      :key="index"
      :data="data"
      v-bind="subMenuProps"
    ></SubMenu>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuProps as ElMenuProps, SubMenuProps } from 'element-plus'
import type { AppRouteMenuItem, IconOptions, MenuSelectEvent } from './types'
import { useMenu } from './useMenu'

interface MenuProps extends Partial<ElMenuProps> {
  data: AppRouteMenuItem[]
  subMenuProps: SubMenuProps
  iconProps?: Partial<IconOptions>
}

const props = withDefaults(defineProps<Partial<MenuProps>>(), {
  data: () => [],
  mode: 'horizontal',
  defaultActive: '1',
  iconProps: () => ({ style: { fontSize: '20px' }, class: 'mr-3' }),
  backgroundColor: '#fff',
  ellipsis: true,
})

const emits = defineEmits<{
  select: [item: AppRouteMenuItem]
}>()

provide('iconProps', props.iconProps)

const { generateMenuKeys, getItem, getParentMenu } = useMenu()
const menuRef = ref()

onMounted(() => {
  const item = getParentMenu(filterData.value)
  if (item?.meta?.key) {
    if (menuRef.value && menuRef.value.open && !props.collapse) {
      menuRef.value.open(item.meta.key)
    }
  }
})

const filterData = computed(() => generateMenuKeys(props.data))
const handleSelect = (...args: MenuSelectEvent) => {
  const [index] = args
  const item = getItem(filterData.value, index)
  if (item) emits('select', item)
}

const getActive = (route: AppRouteMenuItem) => {
  let key = ''
  const findKey = (menus: AppRouteMenuItem[]) => {
    menus.forEach((menu) => {
      if(menu.name === route.name) {
        key =  menu.meta?.key
      }
      if(menu.children?.length) {
        findKey(menu.children)
      }
    })
  }
  findKey(filterData.value)
  return key
}
</script>

<style scoped lang="scss"></style>
