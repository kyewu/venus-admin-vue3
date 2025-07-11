<template>
  <el-form-item v-bind="props">
    <el-col
      v-for="(child, index) in schema"
      v-bind="child.colProps"
      :key="index"
      :span="child.span"
    >
      <VFormItem
        v-bind="child"
        v-if="child.prop"
        v-model="modelValue[child.prop as string]"
      ></VFormItem>
      <VFormItem v-else v-bind="child"></VFormItem>
    </el-col>
  </el-form-item>
</template>

<script setup lang="ts">
import type { VFormItemProp } from './types'
import VFormItem from './VFormItem.vue'

const props = withDefaults(defineProps<VFormItemProp>(), {
  labelWidth: '',
  inlineMessage: false,
  showMessage: true,
  required: undefined,
})

const modelValue = defineModel<any>()
</script>

<style scoped></style>
