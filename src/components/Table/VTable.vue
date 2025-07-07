<template>
  <div class="w-full">
    <el-table ref="tableRef" v-bind="props" v-on="events" highlight-current-row :data="localData" style="width: 100%">
      <VTableColumn v-for="(column, index) in columns" :key="column.id || index" v-bind="column"></VTableColumn>
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
        <el-pagination v-bind="pagination" v-on="pageEvents" layout="total, sizes, prev, pager, next, jumper" background
          :total="50">
          <template #default="scope" v-if="pagination.defaultSlot">
            <component :is="pagination.defaultSlot" v-bind="scope"></component>
          </template>
        </el-pagination>
      </div>
    </slot>
  </div>
</template>

<script setup lang="tsx">
import type { TableColumnType, TableEmitsType, VTableProps } from './types';
import { isDefined } from '@vueuse/core';
import VTableColumn from './VTableColumn.vue';
import { exposeEventUtils, forwardEventUtils } from '@/utils';
import Sortable from 'sortablejs';
import { nextTick } from 'vue';
import DragIcon from './DragIcon.vue';

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

const localCols = ref(props.columns as TableColumnType[])
const localData = ref(props.data as any[])
const rowKey = ref(props.rowKey)

const tableRef = ref()
const events = forwardEventUtils(emits, eventNames)
const pageEvents = forwardEventUtils(emits, pageEventNames, 'page-')
const exposes = exposeEventUtils(tableRef, exposeEvents)

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
defineExpose({ ...exposes })

onBeforeMount(() => {
  localCols.value = addId(props.draggableCol, props.columns as any[])
  localData.value = addId(props.draggableRow, props.data as any[])
  if (props.draggableRow && localData.value.length) {
    const defaultSlot = localCols.value[0].defaultSlot as unknown as any
    localCols.value[0].defaultSlot = (_prop) => {
      const { row} = _prop
      return (
        <>
          <DragIcon>
            {defaultSlot ? (defaultSlot(_prop)) : (
              <span>{localCols.value[0]?.prop ? row[localCols.value[0]?.prop] : ''}</span>
            )}
          </DragIcon>
        </>
      )
    }
  }
})
onMounted(() => {
  if (props.adaptiveHeight) {
    setAdaptiveHeight()
  }
  if (props.draggableCol) {
    columnDrop()
  }
  if (props.draggableRow) {
    rowDrop()
  }
})

function addId(flag: boolean, arr: any[]) {
  const ids = Math.random().toString(36).slice(2)
  if (flag && arr.length && !arr[0].id) {
    arr.forEach((item, index) => {
      item.id = ids + '-' + index
    })
    rowKey.value = 'id'
  }
  return arr
}


async function setAdaptiveHeight() {
  await nextTick()
  if (props.adaptiveHeight) {
    let offset = 50
    if (typeof props.adaptiveHeight === 'number') {
      offset = props.adaptiveHeight
    }
    const height = window.innerHeight - tableRef.value.$el.getBoundingClientRect().top - offset
    tableRef.value.style.height = `${height}px`
  }
}

const fn = useDebounceFn(setAdaptiveHeight, 100)
useResizeObserver(tableRef, fn)

function rowDrop() {
  nextTick(() => {
    const el = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
    Sortable.create(el, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      handle: '.drag-btn',
      setData: function (dataTransfer) {
        dataTransfer.setData('Text', '')
        return true
      },
      onEnd: function ({ newIndex, oldIndex }) {
        const draggedItem = localData.value.splice(oldIndex, 1)[0]
        localData.value.splice(newIndex, 0, draggedItem)
        emits('drag-row-change', localData.value)
      }
    })
  })
}

function columnDrop() {
  nextTick(() => {
    const el = tableRef.value.$el.querySelector('.el-table__header-wrapper tr')
    Sortable.create(el, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      setData: function (dataTransfer) {
        dataTransfer.setData('Text', '')
        return true
      },
      onEnd: function ({ newIndex, oldIndex }) {
        const draggedItem = localCols.value.splice(oldIndex, 1)[0]
        localCols.value.splice(newIndex, 0, draggedItem)
        emits('drag-col-change', localCols.value)
      }
    })
  })
}
</script>

<style scoped lang="scss"></style>