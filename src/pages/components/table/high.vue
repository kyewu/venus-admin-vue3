<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="自适应高度" name="1">
      <VTable :columns="columns" :data="data" highlight-current-row :pagination="pagination" :adaptive-height="true">
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
    prop: 'date',
    label: 'Date'
  },
  {
    prop: 'name',
    label: 'Name'
  },
  {
    prop: 'address',
    label: 'Address'
  },
  {
    prop: 'number',
    label: 'Num'
  }
])

const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 123
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: 333
  },
  {
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
</script>

<style scoped></style>