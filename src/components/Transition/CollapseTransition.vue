<template>
  <Transition
    name="collapse"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
interface CollapseTransitionProps {
  duration?: string | number
}
const props = withDefaults(defineProps<CollapseTransitionProps>(), {
  duration: 300,
})

const duration = computed(() => {
  return typeof props.duration === 'number' ? `${props.duration}ms` : props.duration
})

function onBeforeEnter(el) {
  if (!el.dataset) el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom

  el.style.height = 0
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}

function onEnter(el) {
  el.dataset.oldOverflow = el.style.overflow
  if (el.scrollHeight !== 0) {
    el.style.height = el.scrollHeight + 'px'
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  } else {
    el.style.height = ''
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
  el.style.overflow = 'hidden'
}

function onAfterEnter(el) {
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
}

function onBeforeLeave(el) {
  // 离开时，使用中间变量存储元素的初始状态
  if (!el.dataset) el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow

  el.style.height = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
}

function onLeave(el) {
  if (el.scrollHeight !== 0) {
    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }
}

function onAfterLeave(el) {
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}
</script>

<style scoped lang="scss">
.collapse-enter-active,
.collapse-leave-active {
  transition: all v-bind(duration) ease-in-out;
}
</style>
