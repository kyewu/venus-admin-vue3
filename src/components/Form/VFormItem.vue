<template>
  <el-form-item :ref="(ref) => props?.itemRef && props.itemRef(ref as FormItemInstance)" v-bind="props">
    <template #default="scope" v-if="defaultSlot">
      <component :is="defaultSlot" v-bind="scope"></component>
    </template>
    <template #default v-else>
      <el-input v-if="type === 'input'" v-model="modelValue" v-bind="attrs" />
      <el-select
        v-else-if="type === 'select'"
        v-model="modelValue"
        v-bind="attrs"
      >
        <el-option
          v-for="(option, index) in children"
          :key="index"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-date-picker
        v-else-if="type === 'date-picker'"
        v-model="modelValue"
        type="date"
        v-bind="attrs"
      />
      <el-time-picker
        v-else-if="type === 'time-picker'"
        v-model="modelValue"
        v-bind="attrs"
      />
      <el-switch
        v-else-if="type === 'switch'"
        v-model="modelValue"
        v-bind="attrs"
      />
      <el-checkbox-group
        v-else-if="type === 'checkbox-group'"
        v-model="modelValue"
        v-bind="attrs"
      >
        <el-checkbox
          v-for="(option, index) in children"
          :key="index"
          :value="option.value"
          :name="option.name"
        >
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-else-if="type === 'radio-group'"
        v-model="modelValue"
        v-bind="attrs"
      >
        <el-radio
          v-for="(option, index) in children"
          :key="index"
          :value="option.value"
          >{{ option.label }}</el-radio
        >
      </el-radio-group>
      <el-input
        v-else-if="type === 'textarea'"
        v-model="modelValue"
        type="textarea"
        v-bind="attrs"
      />
      <div v-else v-bind="attrs">{{ value }}</div>
    </template>
    <template #error="scope" v-if="errorSlot">
      <component :is="errorSlot" v-bind="scope"></component>
    </template>
    <template #label="scope" v-if="labelSlot">
      <component :is="labelSlot" v-bind="scope"></component>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import type { FormItemInstance } from 'element-plus';
import type { VFormItemProp } from './types'
const props = withDefaults(defineProps<VFormItemProp>(), {
  labelWidth: '',
  inlineMessage: false,
  showMessage: true,
  required: undefined,
})
const modelValue = defineModel<any>()

onBeforeMount(() => {
  modelValue.value = props.value
})
</script>

<style scoped></style>
