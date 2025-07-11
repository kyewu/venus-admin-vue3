<template>
  <VForm ref="formRef" v-model="model" :schema="schema">
    <template #actions>
      <el-button type="primary" @click="onSubmit">submit</el-button>
      <el-button type="default" @click="onCancel">Cancel</el-button>
    </template>
  </VForm>
</template>

<script setup lang="tsx">
import type { VFormSchema } from '@/components/Form/types'
import { useForm } from '@/components/Form/useForm'
import VForm from '@/components/Form/VForm.vue'
import type { FormInstance, FormItemInstance } from 'element-plus'
definePage({
  meta: {
    title: 'components.form',
    icon: 'ep:edit',
  },
})
const formRef = ref<FormInstance>()
const formItemRef = ref<FormItemInstance>()
const schema = ref([
  {
    type: 'input',
    label: 'Activity name',
    prop: 'name',
    value: '',
    span: 6,
    rules: [
      {
        required: true,
        message: 'Please input activity name',
        trigger: 'change',
      },
    ],
    itemRef: (ref: FormItemInstance) => {
      formItemRef.value = ref
    },
    // labelSlot: (scope: any) => (
    //   <span class="text-gray-500">
    //      <span class="text-red-500 pr-2">*R</span>{scope.label}
    //   </span>
    // ),
  },
  {
    type: 'input',
    label: 'Activity ID',
    prop: 'id',
    value: '',
    span: 6,
    rules: [
      { required: true, message: 'Please input activity ID', trigger: 'blur' },
    ],
  },
  {
    type: 'select',
    label: 'Activity zone',
    span: 6,
    prop: 'region',
    value: '',
    attrs: { placeholder: 'Please select activity zone'},
    rules: [
      {
        required: true,
        message: 'Please select activity zone',
        trigger: 'change',
      },
    ],
    children: [
      { label: 'Zone one', value: 'shanghai' },
      { label: 'Zone two', value: 'beijing' },
    ],
  },
  {
    label: 'Activity time',
    schema: [
      {
        type: 'date-picker',
        prop: 'date',
        label: 'Start Date',
        span: 11,
        value: '',
        rules: [
          {
            required: true,
            message: 'Please select start date',
            trigger: 'change',
          },
        ],
        attrs: { placeholder: 'Pick a date', style: 'width: 100%' },
      },
      {
        value: '-',
        span: 2,
        attrs: { class: 'w-full', style: 'text-align: center' },
      },
      {
        type: 'time-picker',
        prop: 'date2',
        span: 11,
        value: '',
        rules: [
          {
            required: true,
            message: 'Please select start time',
            trigger: 'change',
          },
        ],
        attrs: { placeholder: 'Pick a time', style: 'width: 100%' },
      },
    ],
  },
  { type: 'switch', label: 'Instant delivery', prop: 'delivery', value: false },
  {
    type: 'checkbox-group',
    label: 'Activity type',
    prop: 'type',
    value: [],
    rules: [
      {
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    children: [
      { label: 'Online activities', value: 'Online activities', name: 'type' },
      {
        label: 'Promotion activities',
        value: 'Promotion activities',
        name: 'type',
      },
      {
        label: 'Offline activities',
        value: 'Offline activities',
        name: 'type',
      },
      {
        label: 'Simple brand exposure',
        value: 'Simple brand exposure',
        name: 'type',
      },
    ],
  },
  {
    type: 'radio-group',
    label: 'Resources',
    prop: 'resource',
    value: '',
    rules: [
      {
        required: true,
        message: 'Please select resource type',
        trigger: 'change',
      },
    ],
    children: [
      { label: 'Sponsorship', value: 'Sponsorship' },
      { label: 'Venue', value: 'Venue' },
    ],
  },
  {
    type: 'textarea',
    label: 'Activity form',
    prop: 'desc',
    value: '',
    rules: [
      {
        required: true,
        message: 'Please input activity form',
        trigger: 'blur',
      },
    ],
  },
] as VFormSchema)

const { model } = useForm(schema.value || [])

const onSubmit = () => {
  formRef.value?.validate()
  console.log('Form submitted:', model.value)
}

const onCancel = () => {
  formItemRef.value?.clearValidate()
}
</script>

<style scoped></style>
