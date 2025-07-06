<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
      <template v-if="tab.name === 'nested'">
        <VTable :columns="nestedTableColumns" :data="nestedTableData" :pagination="pagination">
          <template #empty>
            empty message
          </template>
        </VTable>
      </template>
      <template v-if="tab.name === 'multi-select'">
        <VTable ref="multipleTableRef" :columns="mulSelectedTableColumns" :data="nestedTableData"
          :pagination="pagination" @selection-change="handleSelectionChange">
          <template #append>
            <el-button @click="toggleSelection()">Clear selection</el-button>
          </template>
          <template #empty>
            empty message
          </template>
        </VTable>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { PaginationType, TableColumnType } from '@/components/Table/types';
import type { TableInstance } from 'element-plus';

definePage({
  meta: {
    title: 'components.complex-table',
    icon: 'bx:table'
  }
})

const pagination = reactive<PaginationType>({
  align: 'right',
  total: 50,
})
const activeName = ref('nested')
const tabs = reactive([
  {
    label: '嵌套',
    name: 'nested',
  },
  {
    label: '多选',
    name: 'multi-select',
  }
])

const nestedTableColumns = ref<TableColumnType[]>([
  {
    prop: 'date',
    label: 'Date'
  },
  {
    label: 'Delivery Info',
    children: [
      {
        prop: 'name',
        label: 'Name'
      },
      {
        label: 'Address Info',
        children: [
          {
            prop: 'state',
            label: 'State'
          },
          {
            prop: 'city',
            label: 'City'
          },
          {
            prop: 'address',
            label: 'Address'
          },
          {
            prop: 'zip',
            label: 'Zip'
          }
        ]
      }
    ]
  }
])

const nestedTableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const mulSelectedTableColumns = ref<TableColumnType[]>([
  {
    type: 'selection',
    width: 55
  },
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
  }
])

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<any[]>([])

const toggleSelection = (rows?: any[], ignoreSelectable?: boolean) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value![0].toggleRowSelection(
        row,
        undefined,
        ignoreSelectable
      )
    })
  } else {
    multipleTableRef.value![0].clearSelection()
  }
}
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
}
</script>

<style scoped></style>