<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="高度自适应" name="1">
      <VTable :columns="columns" :data="data" highlight-current-row :pagination="pagination" :adaptive-height="true">
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="列拖动" name="2">
      <VTable :columns="columns" :data="data" highlight-current-row :pagination="pagination" :adaptive-height="true"
        draggable-col @drag-col-change="onDragColChange">
      </VTable>
    </el-tab-pane>
    <el-tab-pane label="行拖动" name="3">
      <VTable :columns="draggableRowColumns" :data="data" highlight-current-row :pagination="pagination" :adaptive-height="true"
        draggable-row  @drag-row-change="onDragRowChange">
      </VTable>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx">
import type { PaginationType, TableColumnType } from '@/components/Table/types'

definePage({
  meta: {
    title: 'components.high-table',
    icon: 'fluent:select-all-24-regular'
  }
})

const activeName = ref('1')

const columns = ref<TableColumnType[]>([
  {
    columnKey: 'date',
    prop: 'date',
    label: 'Date'
  },
  {
    columnKey: 'name',
    prop: 'name',
    label: 'Name'
  },
  {
    columnKey: 'address',
    prop: 'address',
    label: 'Address'
  },
  {
    columnKey: 'number',
    prop: 'number',
    label: 'Num'
  }
])

const draggableRowColumns = ref<TableColumnType[]>([
  {
    columnKey: 'date',
    prop: 'date',
    label: 'Date'
  },
  {
    columnKey: 'name',
    prop: 'name',
    label: 'Name'
  },
  {
    columnKey: 'address',
    prop: 'address',
    label: 'Address'
  },
  {
    columnKey: 'number',
    prop: 'number',
    label: 'Num'
  }
])



const data = ref([
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 123
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 333
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 999
  }
])

const pagination = ref({
  align: 'right',
  small: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: 100
} as PaginationType)

const onDragColChange = (columns: TableColumnType[]) => {
  console.log(columns)
}

const onDragRowChange = (rows: any[]) => {
  console.log(rows)
}
</script>

<style scoped></style>