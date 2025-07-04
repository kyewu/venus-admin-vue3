<template>
  <Dropdown :items="locales" @change="changeLocale" :icon-class="iconClass" :icon-props="iconPropsComputed"
    v-model="current">
    <template #header>
      <Iconify :icon="`ion:language`" :class="iconClass"></Iconify>
    </template>
    <template #item="{ item }">
      {{ item.text }}
    </template>
  </Dropdown>
</template>

<script setup lang="tsx">

import Iconify from '../Icon/Iconify.vue';
import type { ChangeLocaleProps, LocaleItem } from './types';

const props = withDefaults(defineProps<ChangeLocaleProps>(), {
  iconClass: 'text-xl',
  iconProps: {}
})

const emit = defineEmits<{
  change: [command: string]
}>()

const current = ref(0)

const iconPropsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locales, icon, ...restProps } = props
  return restProps
})

const changeLocale = (command: LocaleItem, index: number) => {
  current.value = index
  emit('change', command.name)
}
</script>

<style scoped></style>