<template>
  <!-- layout -->
  <template v-if="colProps || span">
    <el-col :span="colProps?.span || span" v-bind="colProps">
      <VFormItem v-bind="props" v-model="modelValue"></VFormItem>
    </el-col>
  </template>
  <template v-else>
    <VFormItem v-bind="props" v-model="modelValue"></VFormItem>
  </template>
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

<style scoped lang="scss"></style>
