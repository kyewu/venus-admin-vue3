<template>
  <el-table-column v-bind="restProps">
    <template #default="scope" v-if="defaultSlot">
      <component :is="defaultSlot" v-bind="scope"></component>
    </template>
    <template #header="scope" v-if="headerSlot">
      <component :is="headerSlot" v-bind="scope"></component>
    </template>
    <template v-if="children && children.length">
      <VTableColumn v-for="(child, index) in children" :key="index" v-bind="child"></VTableColumn>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { TableColumnType } from './types';

const props = defineProps<TableColumnType>()
const { children, ...restProps } = props
</script>

<style scoped></style>