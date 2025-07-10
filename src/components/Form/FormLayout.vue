<template>
  <!-- layout -->
  <template v-if="schema?.length">
    <el-form-item v-bind="props">
      <template v-for="(item, index) in schema" :key="index">
        <el-col v-bind="item.colProps" :span="item.span">
          <VFormItem v-bind="item" v-model="modelValue[item?.prop as string]"></VFormItem>
        </el-col>
      </template>
    </el-form-item>
  </template>
  <template v-else-if="colProps || span">
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
