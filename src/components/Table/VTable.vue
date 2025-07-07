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
    <slot name="footer">
      <!-- default -->
      <div :class="['p-4 flex', paginationDir]" v-if="isDefined(pagination)">
        <el-pagination v-bind="pagination" v-on="pageEvents" layout="total, sizes, prev, pager, next, jumper" background :total="50">
          <template #default="scope" v-if="pagination.defaultSlot">
            <component :is="pagination.defaultSlot" v-bind="scope"></component>
          </template>
        </el-pagination>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { TableEmitsType, VTableProps } from './types';
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
  }),
  adaptiveHeight: false
})

const emits = defineEmits<TableEmitsType>()
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
const pageEventNames = ['current-change', 'size-change', 'prev-click', 'next-click', 'change']
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
const pageEvents = forwardEventUtils(emits, pageEventNames, 'page-')
const exposes = exposeEventUtils(tableRef, exposeEvents)
defineExpose({ ...exposes })

onMounted(() => {
  if(props.adaptiveHeight) {
    setAdaptiveHeight()
  }
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

async function setAdaptiveHeight() {
  await nextTick()
 if (props.adaptiveHeight) {
  let offset = 50
  if(typeof props.adaptiveHeight === 'number') {
    offset = props.adaptiveHeight
  }
  const height = window.innerHeight - tableRef.value.$el.getBoundingClientRect().top - offset
  tableRef.value.style.height = `${height}px`
 }
}

const fn = useDebounceFn(setAdaptiveHeight, 100)
useResizeObserver(tableRef, fn)
</script>

<style scoped lang="scss"></style>