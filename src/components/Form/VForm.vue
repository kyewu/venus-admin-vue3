<template>
  <el-form v-bind="props" style="max-width: 600px">
    <slot name="default">
        <template v-if="schema && schema.length">
          <template v-for="(item, index) in schema" :key="index">
            <VFormLayout v-bind="item" v-model="form[item.prop as string]"></VFormLayout>
          </template>
        </template>
    </slot>
    <slot name="actions"></slot>
  </el-form>
</template>

<script setup lang="ts">
import type { VFormProps } from './types';
import VFormLayout from './FormLayout.vue';

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
  scrollToError: false
},
)
const form =ref()
const emits = defineEmits(['update:modelValue'])

onBeforeMount(() => {
  form.value = setForm(props?.schema || [], 0)
})

watch(() => form.value, () => {
  console.log('form changed', form.value)
  // Emit the form value change
  emits('update:modelValue', form.value)
}, { deep: true })

function setForm(arr: any[], level: any) {
  const obj = {}
  let i = 0
  arr.forEach((item) => {
    if(!item.prop) {
      item.prop = `form-${level}-${i}`
    }
    if(item.value) {
      obj[item.prop] = item.value
    } else if(item.schema?.length) {
      obj[item.prop] = setForm(item.schema, level + 1)
      i++
    } else {
      obj[item.prop] = undefined
    }
  })
  return obj
}


</script>

<style scoped></style>
