<template>
  <VForm v-model="form" :schema="schema"></VForm>
</template>

<script setup lang="ts">
import type { VFormSchema } from '@/components/Form/types'
import VForm from '@/components/Form/VForm.vue'
definePage({
  meta: {
    title: 'components.form',
    icon: 'ep:edit',
  },
})

const form = reactive({
  name: '',
  region: '',
  date: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const schema = [
  { type: 'input', label: 'Activity name', prop: 'name', value: '' },
  {
    type: 'select',
    label: 'Activity zone',
    prop: 'region',
    value: '',
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
        attrs: { placeholder: 'Pick a time', style: 'width: 100%' },
      },
    ],
  },
  { type: 'switch', label: 'Instant delivery', prop: 'delivery',value: false },
  {
    type: 'checkbox-group',
    label: 'Activity type',
    prop: 'type',
    value: [],
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
    children: [
      { label: 'Sponsorship', value: 'Sponsorship' },
      { label: 'Venue', value: 'Venue' },
    ],
  },
  { type: 'textarea', label: 'Activity form', prop: 'desc',value: '' },
] as VFormSchema
</script>

<style scoped></style>
