<template>
  <Iconify icon="ri:brush-2-line" class="text-xl mr-3 cursor-pointer" @click="drawer = true"></Iconify>
  <el-drawer class="lt-sm:w-full!" v-model="drawer" title="Theme Settings" @close="handleClose">
    <el-form :form="form">
      <el-form-item label="Theme Color">
        <el-color-picker v-model="form.theme"></el-color-picker>
      </el-form-item>
      <el-form-item label="Theme Mode">
        <el-switch v-model="form.darkMode"></el-switch>
      </el-form-item>
      <!-- navigation settings -->
      <el-form-item label="Navigation Settings" class="flex-col">
        <div class="flex justify-around flex-1 mt-3">
          <el-tooltip content="左侧菜单">
            <div :class="['item', { active: form.mode === 'sidebar' }]" @click="form.mode = 'sidebar'">
              <div class="bg-dark w-1/4 h-full left-0 top-0 absolute z-30"></div>
              <div class="bg-white w-full h-1/4 left-0 top-0 absolute z-10"></div>
            </div>
          </el-tooltip>
          <el-tooltip content="顶部左侧菜单混合">
            <div :class="['item', { active: form.mode === 'mix' }]" @click="form.mode = 'mix'">
              <div class="bg-white w-1/4 h-full left-0 top-0 absolute z-10"></div>
              <div class="bg-dark w-full h-1/4 left-0 top-0 absolute z-30"></div>
            </div>
          </el-tooltip>
          <el-tooltip content="顶部菜单">
            <div :class="['item', { active: form.mode === 'top' }]" @click="form.mode = 'top'">
              <div class="bg-dark w-full h-1/4 left-0 top-0 absolute z-10"></div>
            </div>
          </el-tooltip>
          <el-tooltip content="左侧菜单混合">
            <div :class="['item', { active: form.mode === 'mixbar' }]" @click="form.mode = 'mixbar'">
              <div class="bg-dark w-1/5 h-full left-0 top-0 absolute z-30"></div>
              <div class="bg-white w-1/3 h-full left-0 top-0 absolute z-10"></div>
              <div class="bg-white w-full h-1/4 left-0 top-0 absolute z-20 border-b"></div>
            </div>
          </el-tooltip>
        </div>
      </el-form-item>
      <!-- Menu Background -->
      <el-form-item label="Menu Background">
        <el-color-picker v-model="form.backgroundColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="Menu Width">
        <el-slider class="ml-3" :max="600" :min="220" v-model="form.menuWidth" show-input input-size="small" />
      </el-form-item>
      <!-- logo -->
      <el-form-item label="Logo">
        <el-switch v-model="form.showLogo"></el-switch>
      </el-form-item>
      <!-- trasition -->
      <el-form-item label="Transition">
        <el-select v-model="form.transition">
          <el-option
            v-for="(transition, index) in TRANSITION_NAMES"
            :key="index"
            :label="transition"
            :value="transition"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- tag page -->
      <el-form-item label="Tabs Page">
        <el-switch v-model="form.showTabs"></el-switch>
      </el-form-item>
      <!-- fixed header -->
      <el-form-item label="Fixed Header">
        <el-switch v-model="form.fixedHead"></el-switch>
      </el-form-item>
      <!-- 面包屑 -->
      <el-form-item label="Breadcrumb">
        <el-switch v-model="form.showBreadcrumb"></el-switch>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import Iconify from '../Icon/Iconify.vue';
import { TransitionNameEnum, TRANSITION_NAMES } from './constant';
import type { ThemeSettingsProps } from './types';

const drawer = ref(false)
const emit = defineEmits<{
  change: [settings: ThemeSettingsProps]
}>()

const props = withDefaults(defineProps<Partial<ThemeSettingsProps>>(), {
  theme: '#000',
  menuWidth: 240,
  darkMode: false,
  showLogo: false,
  showTabs: true,
  fixedHead: false,
  showBreadcrumb: true,
  mode: 'sidebar',
  backgroundColor: '#fff',
  transition: TransitionNameEnum.Fade
})
const form = reactive<ThemeSettingsProps>({ ...props })
const handleClose = () => {
  console.log(form.backgroundColor)
  emit('change', form)
}

onMounted(() => {
  emit('change', form)
})
</script>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  justify-content: flex-end;
}

.item {
  @apply bg-gray-100 rounded w-15 h-12 relative overflow-hidden shadow border border-gray-100 cursor-pointer;

  &.active {
    @apply border-sky-800 border-2;
  }
}
</style>
