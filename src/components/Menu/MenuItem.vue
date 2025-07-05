<template>
  <el-menu-item :index="getIndex(data)" v-if="!data.meta?.icon" :disabled="data.meta?.disabled">{{ data.meta?.title
  }}</el-menu-item>
  <template v-else>
    <el-menu-item v-if="collapse" :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps?.class"></Iconify>
      <template #title>
        <div class="">{{ data.meta?.title ? $t(data.meta?.title) : '' }}</div>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon" :style="iconProps?.style" :class="iconProps?.class"></Iconify>
      <div class="">{{ data.meta?.title ? $t(data.meta?.title) : '' }}</div>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem, IconOptions } from './types';
import Iconify from "../Icon/Iconify.vue";
import { useMenu } from './useMenu';

interface MenuItemProps {
  data: AppRouteMenuItem
  collapse?: boolean
}

defineProps<MenuItemProps>()
const { getIndex } = useMenu()

const iconProps = inject<IconOptions>('iconProps')

</script>

<style scoped></style>