<template>
  <div class="flex items-center">
    <el-dropdown v-bind="props" @command="handleCommand">
      <el-avatar :size="avatarSize" :src="src" :alt="alt" :shape="shape" :fit="fit" :icon="icon" :src-set="srcSet" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(option, index) in data" :key="index" :divided="index === data.length - 1"
            :command="typeof option === 'object' && option?.key ? option.key : option">{{ typeof option === 'object' &&
              option?.value ? option.value : option }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="ml-2 text-gray-600 text-4">{{ username }}</span>

  </div>
</template>

<script setup lang="ts">
import type { AvatarMenuProps } from './types';

const props = withDefaults(defineProps<Partial<AvatarMenuProps>>(), {
  trigger: 'click',
  avatarSize: 28,
  username: 'Kye',
  src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  data: () => [{ key: '1', value: '个人中心' }, { key: '2', value: '退出登录' }]
})

const emits = defineEmits<{
  command: [arg: string | number | object]
}>()
const handleCommand = (command: string | number | object) => {
  console.log('user center:', command)
  emits('command', command)
}
</script>

<style scoped></style>