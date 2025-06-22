<template>
  <component :is="tag" :class="[, isFullscreen ? 'i-mdi-fullscreen-exit' : 'i-mdi-fullscreen', iconClass]"
    @click="toggle"></component>
</template>

<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()

const { tag = 'i', iconClass = 'text-xl cursor-pointer' } = defineProps<{ tag?: string; iconClass?: string }>()
</script>

<style scoped lang="scss"></style>