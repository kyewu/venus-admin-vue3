<template>
  <div class="icon-picker">
    <!-- button & icon -->
    <el-button type="primary" @click="() => toggle(true)">
      <slot>{{ 'components.icon-picker' }}</slot>
    </el-button>
    <!-- dialog -->
    <el-dialog :title="title" :width="width" v-model="show">
      <!-- icon-list -->
      <IconList
        item-class="hover:bg-sky-100 p-1"
        icon-class="text-2xl"
        :show-text="false"
        @click="handleClick"
        activeClass="text-[#409eff]"
      ></IconList>
      <!-- settings -->
      <div class="p-2 flex">
        <div class="mr-4">
          <span class="pr-2">color:</span>
          <el-color-picker v-model="color" />
        </div>
        <div class="flex items-center flex-1">
          <span class="pr-2">fontSize:</span>
          <el-slider v-model="num" :step="1" show-input />
        </div>
      </div>
      <div class="flex items-center">
        <span class="pr-2">{{ 'components.choose-icon' }}：</span>
        <Icon :icon="iconRef" :style="{ color: color, fontSize: `${num}px` }"></Icon>
        <span class="pl-2">{{ iconRef }}</span>
      </div>
      <template #footer>
        <el-button @click="() => toggle(false)">{{ 'components.cancel' }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ 'components.submit' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IconPickerSubmitDataProps } from './types'

interface IconPickerProps {
  width?: string
  title?: string
}

withDefaults(defineProps<IconPickerProps>(), {
  width: '50%',
  title: 'components.icon-picker'
})

const color = ref('#409eff')
const num = ref(16)
const iconRef = ref('')

const [show, toggle] = useToggle(false)
const emits = defineEmits<{
  submit: [IconPickerSubmitDataProps]
  cancel: []
}>()

const handleClick = (i: string) => {
  iconRef.value = i
}

// 确定并关闭模态框
const handleConfirm = () => {
  toggle(false)
  emits('submit', { icon: iconRef.value, color: color.value, fontSize: num.value })
}
</script>

<style scoped lang="scss">
.icon-picker {
  :deep(.el-dialog__body) {
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
    max-height: 65vh;
    overflow-y: auto;
  }
}
</style>