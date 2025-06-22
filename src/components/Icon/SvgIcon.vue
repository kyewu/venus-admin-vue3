<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIcon', inheritAttrs: false })
const {name} = defineProps({
  name: { type: String, required: true },
})
const iconName = `#${name}`
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>