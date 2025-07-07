<template>
  <VForm :model="form" :schema="schema"></VForm>
</template>

<script setup lang="ts">
import type { VFormSchema } from '@/components/Form/types'
import VForm from '@/components/Form/VForm.vue'
definePage({
  meta: {
    title: 'components.form',
    icon: 'ep:edit',
  }
})

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const schema = [
  { type: 'input', label: 'Input', prop: 'input' },
  { type: 'select', label: 'Select', prop: 'select' },
  { type: 'date-picker', label: 'Date Picker', prop: 'date-picker' },
  { type: 'time-picker', label: 'Time Picker', prop: 'time-picker' },
  { type: 'switch', label: 'Switch', prop: 'switch' },
  { type: 'checkbox-group', label: 'Checkbox Group', prop: 'checkbox-group' },
  { type: 'radio-group', label: 'Radio Group', prop: 'radio-group' }
] as VFormSchema
</script>

<style scoped></style>