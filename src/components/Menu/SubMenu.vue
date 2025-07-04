<template>
  <template v-if="!data.children?.length">
    <MenuItem :data="data" :collapse="collapse"></MenuItem>
  </template>
  <template v-else>
    <el-sub-menu :index="getIndex(data)">
      <template v-if="!data.meta?.icon" #title>{{ data.meta?.title ? $t(data.meta?.title) : '' }}</template>
      <template v-else #title>
        <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps?.class"></Iconify>
        <span>{{ data.meta?.title ? $t(data.meta?.title) : '' }}</span>
      </template>
      <SubMenu v-for="(child, index) in data.children" :key="`${data.path}/${index}`" :data="child" v-bind="subAttrs">
      </SubMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { SubMenuProps as ElSubMenuProps } from 'element-plus';
import type { AppRouteMenuItem, IconOptions } from './types';
import { useMenu } from './useMenu';

interface SubMenuProps extends Partial<ElSubMenuProps> {
  data: AppRouteMenuItem;
  collapse?: boolean
}

const props = defineProps<SubMenuProps>()

const { getIndex } = useMenu()

const subAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, ...rest } = props
  return rest
})

const iconProps =inject<IconOptions>('iconProps')
</script>

<style scoped>
</style>