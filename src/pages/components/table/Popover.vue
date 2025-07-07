<template>
  <el-popover v-if="row && Object.keys(row).length" effect="light" trigger="hover" placement="top" width="auto">
    <template #default>
      <div>name: {{ row.name }}</div>
      <div>address: {{ row.address }}</div>
    </template>
    <template #reference>
      <el-tag>{{ row.name }}</el-tag>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
interface Row {
  [key: string]: any
}
withDefaults(defineProps<{
  row: Row
}>(), {
  row: () => ({}),
})
</script>

<style scoped></style>