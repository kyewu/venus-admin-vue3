<template>
  <el-form v-bind="props" style="max-width: 600px">
    <slot name="default">
      <template v-if="schema && schema.length">
        <VFormItem v-bind="item" v-for="(item, index) in schema" :key="index"></VFormItem>
      </template>
    </slot>
  </el-form>
</template>

<script setup lang="ts">
import type { VFormProps } from './types';

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
</script>

<style scoped></style>