<template>
  <div class="" @click="toggle(!show)">toggle
  </div>
  <CollapseTransition>
    <div class="overflow-y-auto h-40 w-full p-4 w-15 border-1 border-amber bg-sky" v-if="show">
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
    </div>
  </CollapseTransition>
</template>

<script setup lang="ts">
import CollapseTransition from '@/components/Transition/CollapseTransition.vue'

definePage({
  meta: {
    title: 'components.collapse-transition',
    icon: 'line-md:loading-loop',
  },
})

const [show, toggle] = useToggle(true)
</script>

<style scoped></style>
