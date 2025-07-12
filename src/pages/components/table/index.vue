<template>
  <VTable :columns="columns" :data="data" :pagination="pagination" @row-click="onRowClick" @page-change="onPageChange"
    @page-current-change="onPageChange" @page-next-click="onPageChange" @page-prev-click="onPageChange" @page-size-change="onPageChange">
    <template #append>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem">
        Add Item
      </el-button>
    </template>
    <template #empty>
      empty message
    </template>
  </VTable>
</template>

<script setup lang="tsx">
import type { PaginationType, TableColumnType } from '@/components/Table/types';

definePage({
  meta: {
    title: 'components.basic-table',
    icon: 'mdi:message'
  }
})
const columns = ref<TableColumnType[]>([
  { label: 'Date', prop: 'date', fixed: true },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
  {
    label: 'Operation', prop: 'operation', width: 160, fixed: 'right', align: 'center', defaultSlot: (_props) => (
      <>
        <el-button size="small" onClick={(e) => {
          e.stopPropagation()
          editRow(_props)
        }}>
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          onClick={(e) => {
            e.stopPropagation()
            deleteRow(_props)
          }}
        >
          Delete
        </el-button>
      </>
    )
  },
])

const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
const pagination = ref<PaginationType>({ align: 'right', total: 50 })

const editRow = (props: any) => {
  console.log(props)
}

const deleteRow = ({ $index }) => {
  data.value.splice($index, 1)
}

const onAddItem = () => {
  data.value.push({
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  })
}

const onRowClick = (row: any, column: any, event: Event): void => {
  console.log('row click', row, column, event)
}

const onPageChange = (_): void => {
  console.log('size change', _)
}

</script>

<style scoped></style>
