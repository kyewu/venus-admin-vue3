<template>
  <el-menu-item :index="getIndex(data)" v-if="!data.meta?.icon" :disabled="data.meta?.disabled">{{ data.meta?.title
    }}</el-menu-item>
  <template v-else>
    <el-menu-item v-if="collapse" :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon"></Iconify>
      <template #title>
        {{ data.meta?.title }}
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
      <Iconify :icon="data.meta?.icon"></Iconify>
      <span class="ml-2">{{ data.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem } from './types';
import { useMenu } from './useMenu';

interface MenuItemProps {
  data: AppRouteMenuItem
  collapse?: boolean
}

defineProps<MenuItemProps>()
const { getIndex } = useMenu()

</script>

<style scoped></style>