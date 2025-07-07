<template>
  <el-form-item v-bind="props">
    <el-input v-if="type === 'input'" v-model="modelValue" />
    <el-select v-else-if="type === 'select'" v-model="modelValue" v-bind="$attrs">
      <el-option label="Zone one" value="shanghai" />
      <el-option label="Zone two" value="beijing" />
    </el-select>
    <el-date-picker v-else-if="type === 'date-picker'" v-model="modelValue" type="date" placeholder="Pick a date" style="width: 100%" />
    <el-time-picker v-else-if="type === 'time-picker'" v-model="modelValue" placeholder="Pick a time" style="width: 100%" />
    <el-switch v-else-if="type === 'switch'" v-model="modelValue" />
    <el-checkbox-group v-else-if="type === 'checkbox-group'" v-model="modelValue">
      <el-checkbox value="Online activities" name="type">
        Online activities
      </el-checkbox>
      <el-checkbox value="Promotion activities" name="type">
        Promotion activities
      </el-checkbox>
      <el-checkbox value="Offline activities" name="type">
        Offline activities
      </el-checkbox>
      <el-checkbox value="Simple brand exposure" name="type">
        Simple brand exposure
      </el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type === 'radio-group'" v-model="modelValue">
      <el-radio value="Sponsor">Sponsor</el-radio>
      <el-radio value="Venue">Venue</el-radio>
    </el-radio-group>
    <div v-else>{{ label }}</div>
  </el-form-item>
</template>

<script setup lang="ts">
import type { VFormItemProp } from './types';
const modelValue = defineModel<any>()
const props = withDefaults(defineProps<VFormItemProp>(), {})
</script>

<style scoped></style>