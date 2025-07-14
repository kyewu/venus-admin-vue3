<template>
  <div ref="vditorRef"></div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, shallowRef } from 'vue'
import type { VEditorProps, VEditorOptions } from './types'

const props = defineProps<VEditorProps>()
const emits = defineEmits(['init'])
const history = ref()
const modelValue = defineModel()
const vditorRef = ref<HTMLDivElement | null>(null)
const editorInstance = shallowRef<Vditor>()
const defaultOptions: VEditorOptions = {
  rtl: false,
  undoDelay: 1000,
  value: '',
  debugger: false,
  typewriterMode: false,
  height: 'auto',
  minHeight: 400,
  width: 'auto',
  placeholder: '',
  lang: 'zh_CN',
  fullscreen: { index: 90 },
  counter: { enable: false },
  cache: { enable: true, id: Math.random().toString(36).slice(2) },
  mode: 'wysiwyg',
  link: { isOpen: true },
  image: { isPreview: true },
  toolbarConfig: { hide: false, pin: false },
  comment: { enable: false },
  theme: 'classic',
  icon: 'ant',
  tab: '\t',
}

function initEditor(options) {
  const defaultAfter = options?.after
  const defaultInput = options?.input
  const instance = new Vditor(
    vditorRef.value!,
    Object.assign(defaultOptions, {
      ...props.options,
      after: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        defaultAfter && defaultAfter()
        if (history.value) {
          instance.setValue(history.value, true)
        }
        const tmp = instance.getValue()
        if (!tmp) {
          modelValue.value = tmp
        }
      },
      input: (md) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        defaultInput && defaultInput()
        modelValue.value = md
      },
    }),
  )
  editorInstance.value = instance
  modelValue.value = options?.value || ''
  return instance
}

onMounted(() => {
  initEditor(props.options)
  emits('init', editorInstance.value)
})

onBeforeUnmount(() => {
  if (editorInstance.value) {
    editorInstance.value.destroy()
  }
})

watch(modelValue, (newValue) => {
  if (
    editorInstance.value &&
    newValue &&
    `${newValue}` !== editorInstance.value.getValue()
  ) {
    editorInstance.value.setValue(newValue + '')
    console.log(editorInstance.value.getValue())
  }
})

const fn = useDebounceFn((newOptions) => {
  if (editorInstance.value) {
    try {
      history.value = editorInstance.value?.getValue()
      editorInstance.value.destroy()
    } catch {
      history.value = ''
    }
    initEditor(newOptions)
  }
}, 30)

watch(props.options, fn, {
  deep: true,
})
</script>

<style scoped></style>
