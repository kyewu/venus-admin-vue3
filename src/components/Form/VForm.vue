<template>
  <el-form class="w-full px-4" ref="formRef" :model="model" :rules="rules" >
    <slot name="default">
      <el-row :class="rowClass" :style="rowStyle">
        <template v-if="schema && schema.length">
          <template v-for="(item, index) in schema" :key="index">
            <VFormLayoutSchema
              v-if="item?.schema?.length"
              v-bind="item"
              v-model="model"
            ></VFormLayoutSchema>
            <VFormLayout v-else v-bind="item" v-model="model[item.prop as string]"></VFormLayout>
          </template>
        </template>
      </el-row>
    </slot>
    <slot name="actions"></slot>
  </el-form>
</template>

<script setup lang="ts">
import type { VFormProps } from './types'
import VFormLayout from './FormLayout.vue'
import VFormLayoutSchema from './VFormLayoutSchema.vue'
import { useForm } from './useForm'
import type { FormInstance, FormItemProp } from 'element-plus';
import { exposeEventUtils } from '@/utils';

const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<VFormProps>(), {
  inline: false,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left',
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: false,
  disabled: false,
  scrollToError: false,
})
const emits = defineEmits<{
  'update:modelValue': [model: any],
  validate: [(prop: FormItemProp, isValid: boolean, message: string) => void]
}>()

const formExposeNames = [
  'validate',
  'validateField',
  'resetFields',
  'scrollToField',
  'clearValidate',
  'fields',
  'getField'
]

const expose = exposeEventUtils(formRef, formExposeNames)
defineExpose({...expose})
const { model, rules } = useForm(props.schema || [])

watch(
  () => model.value,
  () => {
    // Emit the form value change
    emits('update:modelValue', model.value)
  },
  { deep: true },
)
</script>

<style scoped></style>
