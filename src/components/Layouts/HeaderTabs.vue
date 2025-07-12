<template>
  <div class="flex items-center justify-between px-2">
    <el-tabs
      class="myTabs"
      type="card"
      closable
      v-on="events"
      v-model="modelValue"
    >
      <el-tab-pane
        v-for="item in data"
        :key="item.name as string"
        :label="item.meta && item.meta.title && $t(item.meta.title)"
        :name="(item.name as string)"
      >
      </el-tab-pane>
    </el-tabs>
    <Dropdown class="w-6" :items="items" @change="changeClick">
      <template #header>
        <Iconify icon="mdi:view-grid" size="18px" />
      </template>
      <template #item="{ item }">
        {{ item.text }}
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">

import { forwardEventUtils } from '@/utils'
import Dropdown from '../Menu/Dropdown.vue'
import { TabActions } from './const'
import Iconify from '../Icon/Iconify.vue'
import type { HeaderTabEvents, HeaderTabsProps } from './types'



const emits = defineEmits<HeaderTabEvents>()
const modelValue = defineModel<string>()

withDefaults(defineProps<HeaderTabsProps>(), {
  data: () => [],
})

const eventNames = ['tabClick', 'tabChange', 'tabRemove', 'tabAdd', 'edit']

const events = forwardEventUtils(emits, eventNames)
const items = ref([
  {
    action: TabActions.closeOthers,
    icon: 'ep:close',
    text: '关闭其他',
  },
  {
    action: TabActions.closeLeft,
    icon: 'line-md:arrow-close-left',
    text: '关闭左侧',
  },
  {
    action: TabActions.closeRight,
    icon: 'line-md:arrow-close-right',
    text: '关闭右侧',
  },
  {
    action: TabActions.closeAll,
    icon: 'codicon:close-all',
    text: '关闭全部',
  },
])

const changeClick = (item) => {
  emits('tabMenuClick', item && item.action)
}
</script>

<style scoped lang="scss">
.myTabs {
  :deep(.el-tabs__header) {
    @apply p-0 m-0 border-b-none flex items-center;

    .el-tabs__nav {
      @apply border-none;
    }

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      line-height: 40px;
    }
  }

  :deep(.el-tabs__item) {
    @apply py-0 h-[34px] px-4;
    border-radius: 4px;
    border: 1px solid var(--el-border-color) !important;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    margin-right: 5px;

    &.is-active {
      color: var(--el-color-primary) !important;
      background: var(--el-color-primary-light-9) !important;
      border: 1px solid var(--el-color-primary) !important;
    }
  }
}
</style>
