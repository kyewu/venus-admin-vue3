<template>
  <el-switch
    style="--el-switch-on-color: #333"
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sun"
    size="large"
  />
</template>

<script setup lang="tsx">
const props = defineProps({
  dark: Boolean
})

const emits = defineEmits(['change'])

const Moon = () => <i class="i-prime:moon text-3xl"></i>
const Sun = () => <i class="i-octicon:sun-24 text-3xl"></i>

const isDark = useStorage('dark-mode-flag', props.dark)
const preferredDark = usePreferredDark()

onMounted(() => {
  // 如果用户未设置过darkmode，则使用系统的暗黑模式的状态
  if (typeof isDark.value === 'undefined' && !props.dark) {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  }
})

function toggleMode(flag: boolean) {
  if (flag) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
watch(
  [isDark],
  () => {
    nextTick(() => {
      toggleMode(isDark.value)
      emits('change', isDark)
    })
  },
  {
    immediate: true
  }
)
// 跟随系统
watch([preferredDark], () => {
  nextTick(() => {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  })
})
</script>
<style scoped></style>