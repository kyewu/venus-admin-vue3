<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <slot name="header"> </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in items"
          :key="index"
          :command="{ item, index }"
          :class="{ active: index === currentIndex }"
        >
          <div class="flex items-center">
            <Iconify
              v-if="item.icon"
              :icon="item.icon"
              v-bind="iconProps"
              class="mr-2"
              :class="iconClass"
            ></Iconify>
            <slot name="item" :item="item"></slot>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" generic="T extends { icon?: string | IconifyIcon }">
import type { IconifyIcon } from '@iconify/vue'
import type { DropDownProps } from './types'

const props = defineProps<DropDownProps<T>>()
const emits = defineEmits<{
  change: [item: T, index: number]
}>()

const currentIndex = defineModel('modelValue', {
  default: 0
})
const currentItem = defineModel<T>('item', {
  default: () => ({})
})

onBeforeMount(() => {
  currentItem.value = props.items[currentIndex.value]
})

const handleCommand = (command: { item: T; index: number }) => {
  currentIndex.value = command.index
  currentItem.value = command.item
  emits('change', command.item, command.index)
}
</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  &.active {
    color: var(--el-dropdown-menuItem-hover-color);
    background-color: var(--el-dropdown-menuItem-hover-fill);
  }
}
</style>