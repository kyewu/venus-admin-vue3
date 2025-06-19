<template>
  <div class="color-rose" ref="target">home</div>
  {{ x }} - {{ y }} - {{ isOutside }}
  <hello-world
    msg="hello world!"
    foo="'123'"
    @change="changeClick"
    v-model="modelValue"
    @update:model-value="changeModelValue"
  ></hello-world>
   <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
const count = ref(0)
console.log(count.value)

const target = useTemplateRef<HTMLDivElement>('target')
const { x, y, isOutside } = useMouseInElement(target)

const changeClick = (value: number) => {
  console.log(value)
}

const modelValue = ref('hello model value')

const changeModelValue = (value: string) => {
  console.log('change model value:', value)
}

onMounted(() => {
  useRegisterSW({
    immediate: true,
    onRegisteredSW(swScriptUrl, registration) {
      console.log('swScriptUrl:', swScriptUrl)
      console.log('registration:', registration)
      setInterval(() => {
        if (registration) {
          registration.update()
        }
      }, 5000)
    },
  })
})
</script>
