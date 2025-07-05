<template>
  <div class="w-full">
    <el-table :data="data" :stripe="stripe" :flexible="flexible" :fit="true" style="width: 100%">
      <el-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
      </el-table-column>
    </el-table>
    <div :class="['p-4 flex', paginationDir]">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" background :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VTableProps } from './types';


const props = withDefaults(defineProps<Partial<VTableProps>>(), {
  stripe: true,
  fit: true,
  data: () => [],
  columns: () => [],
  flexible : true,
  pagination: () => ({
    align: 'center',
    total: 0
  })
})

const paginationDir = computed(() => {
  let defaultClass = 'justify-center'
  if (!props.pagination?.align) {
    return defaultClass
  }
  if (props.pagination.align === 'left') {
    defaultClass = 'justify-start'
  }
  if (props.pagination.align === 'right') {
    defaultClass = 'justify-end'
  }
  return defaultClass
})
</script>

<style scoped lang="scss"></style>