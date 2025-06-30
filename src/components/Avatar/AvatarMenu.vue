<template>
  <div class="flex items-center">
    <el-dropdown v-bind="props" @command="handleCommand">
      <el-avatar :size="avatarSize" :src="src" :alt="alt" :shape="shape" :fit="fit" :icon="icon" :src-set="srcSet">
        {{ username ? username[0].toUpperCase() : '' }}
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(option, index) in data" :key="index" :divided="index === data.length - 1"
            :command="typeof option === 'object' && option?.key ? option.key : option">{{ typeof option === 'object' &&
              option?.value ? option.value : option }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span v-if="username" class="ml-2 text-gray-600 text-4">{{ username }}</span>

  </div>
</template>

<script setup lang="ts">
import type { AvatarMenuProps } from './types';

const props = withDefaults(defineProps<Partial<AvatarMenuProps>>(), {
  trigger: 'click',
  avatarSize: 28,
  size: 'small',
  username: '',
  src: '',
  data: () => [{ key: '1', value: '个人中心' }, { key: '2', value: '退出登录' }]
})

const emits = defineEmits<{
  command: [arg: string | number | object]
}>()
const handleCommand = (command: string | number | object) => {
  emits('command', command)
}
</script>

<style scoped></style>