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
      <template v-if="tab.name === 'sort'">
        <VTable :columns="sortTableColumns" :data="nestedTableData" :pagination="pagination"></VTable>
      </template>
      <template v-if="tab.name === 'filter'">
        <el-button @click="resetDateFilter">reset date filter</el-button>
        <el-button @click="clearFilter">reset all filters</el-button>
        <VTable ref="filterTableRef" :columns="filterTableColumns" :data="filterData" :pagination="pagination"></VTable>
      </template>
      <template v-if="tab.name === 'customColumnTpl'">
        <VTable :columns="customColumnTableColumns" :data="nestedTableData" :pagination="pagination"></VTable>
      </template>
      <template v-if="tab.name === 'customColumnHeaderTpl'">
        <VTable :columns="customColHeaders" :data="customColHeaderData" :pagination="pagination"></VTable>
      </template>
      <template v-if="tab.name === 'expandRow'">
        <VTable :columns="expandColumns" :data="expandTableData" :pagination="pagination"></VTable>
      </template>
      <template v-if="tab.name === 'tree'">
        <VTable :data="treeTableData" :columns="treeTableColumns" default-expand-all row-key="id" :tree-props="treeProps"></VTable>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="tsx">
import type { PaginationType, TableColumnType } from '@/components/Table/types';
import type { TableInstance } from 'element-plus';
import Popover from './components/Popover.vue';
import VTable from '@/components/Table/VTable.vue';

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
  },
  {
    label: '排序',
    name: 'sort',
  },
  {
    label: '筛选',
    name: 'filter',
  },
  {
    label: '自定义列',
    name: 'customColumnTpl',
  },
  {
    label: '自定义表头',
    name: 'customColumnHeaderTpl',
  },
  {
    label: '展开行',
    name: 'expandRow',
  },
  {
    label: '树形',
    name: 'tree',
  },
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
] as TableColumnType[])

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
    name: 'Anna',
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

const sortTableColumns = ref<TableColumnType[]>([
  {
    prop: 'date',
    label: 'Date',
    sortable: true
  },
  {
    prop: 'name',
    label: 'Name',
    sortable: true
  },
  {
    prop: 'address',
    label: 'Address',
    sortable: true
  }
])

const filterTableColumns = ref<TableColumnType[]>([
  {
    prop: 'date',
    label: 'Date',
    filterMultiple: true,
    columnKey: 'date',
    filters: [
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ],
    filterMethod: (...args) => filterHandler(...args)
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
    prop: 'tag',
    label: 'Tag',
    filterMultiple: true,
    filters: [
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ],
    filterMethod: (value: string, row: any) => filterTag(value, row)
  }
])

const filterData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
])

const childColumns = ref<TableColumnType[]>([
  {
    prop: 'name',
    label: 'Name'
  },
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
])

const childComponent = (data) => (
  <>
    <v-table data={data} columns={childColumns.value}></v-table>
  </>
)

const expandColumns = ref<TableColumnType[]>([
  {
    type: 'expand',
    width: 50,
    defaultSlot: ({ row }) => (
      <div>
        {childComponent(row.family)}
      </div>
    )

  },
  {
    prop: 'date',
    label: 'Date'
  },
  {
    prop: 'name',
    label: 'Name'
  }
])

const expandTableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
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

const filterTableRef = ref<TableInstance>()

const resetDateFilter = () => {
  filterTableRef.value![0].clearFilter(['date'])
}
const clearFilter = () => {
  filterTableRef.value![0].clearFilter()
}

const filterTag = (value: string, row: any) => {
  return row.tag === value
}
const filterHandler = (
  value: string,
  row: any,
  column: TableColumnType
) => {
  const property = column['property']
  return row[property as string] === value
}

const customColumnTableColumns = ref<TableColumnType[]>([
  {
    prop: 'date',
    label: 'Date',
    sortable: true,
    defaultSlot: (scope: any) => {
      return (
        <div class="flex items-center">
          <span style="margin-left: 10px">{scope.row.date}</span>
        </div>
      )
    }
  },
  {
    prop: 'name',
    label: 'Name',
    sortable: true,
    defaultSlot: (scope: any) => h(Popover, { row: scope.row })
  },
  {
    prop: 'address',
    label: 'Address',
    sortable: true
  }
])

const search = ref('')
const customColHeaders = ref([
  {
    prop: 'date',
    label: 'Date',
    sortable: true
  },
  {
    prop: 'name',
    label: 'Name',
    sortable: true
  },
  {
    prop: 'address',
    label: 'Address',
    sortable: true
  },
  {
    prop: 'city',
    label: 'City',
    headerSlot: () => {
      return (
        <div class="flex items-center">
          <el-input modelValue={search.value} onInput={(e) => (search.value = e)} size="small" placeholder="Type to search" />
        </div>
      )
    }
  }
])
const customColHeaderData = computed(() => {
  return nestedTableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
})

// tree
const treeTableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const treeTableColumns = [
  {
    type: 'selection',
    width: 55
  },
  {
    prop: 'date',
    label: 'Date',
    selectable: () =>true
  },
  {
    prop: 'name',
    label: 'Name'
  },
  {
    prop: 'address',
    label: 'Address'
  }
] as TableColumnType[]

const treeProps = reactive({
  checkStrictly: false,
})
</script>

<style scoped></style>