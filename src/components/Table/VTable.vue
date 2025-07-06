<template>
  <div class="w-full">
    <el-table ref="tableRef" v-bind="props" v-on="events" highlight-current-row style="width: 100%">
      <VTableColumn v-for="(column, index) in columns" :key="index" v-bind="column"></VTableColumn>
      <slot></slot>
      <template #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>
    <div :class="['p-4 flex', paginationDir]" v-if="isDefined(pagination)">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" background :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableEventsType, VTableProps } from './types';
import { isDefined } from '@vueuse/core';
import VTableColumn from './VTableColumn.vue';
import { exposeEventUtils, forwardEventUtils } from '@/utils';

const props = withDefaults(defineProps<Partial<VTableProps>>(), {
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: 'No Data',
  defaultExpandAll: false,
  tooltipEffect: 'dark',
  showSummary: false,
  flexible: false,
  selectOnIndeterminate: true,
  indent: 16,
  tableLayout: 'fixed',
  scrollbarAlwaysOn: false,
  adaptive: false,
  loading: false,
  draggableCol: false,
  draggableRow: false,
  pagination: () => ({
    align: 'center',
    total: 0
  })
})

const emits = defineEmits<TableEventsType>()
const eventNames = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
  'scroll',
]

const exposeEvents = [
  'clearSelection',
  'getSelectionRows',
  'toggleRowSelection',
  'toggleAllSelection',
  'toggleRowExpansion',
  'setCurrentRow',
  'clearSort',
  'clearFilter',
  'doLayout',
  'sort',
  'scrollTo',
  'setScrollTop',
  'setScrollLeft'
]

const tableRef = ref()
const events = forwardEventUtils(emits, eventNames)
const exposes = exposeEventUtils(tableRef, exposeEvents)
defineExpose({ ...exposes })


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