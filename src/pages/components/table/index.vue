<template>
  <VTable :columns="columns" :data="data" :pagination="pagination"></VTable>
</template>

<script setup lang="ts">
import type { PaginationType, TableColumnType } from '@/components/Table/types';

definePage({
  meta: {
    title: 'components.basic-table',
    icon: 'mdi:message'
  }
})
const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
] as TableColumnType[]

const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const pagination: PaginationType = { align: 'right', total: 50 }

</script>

<style scoped></style>