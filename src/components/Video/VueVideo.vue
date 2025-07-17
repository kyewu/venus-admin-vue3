<template>
  <div class="videoRef">
    <video ref="playerRef" class="video-js"></video>
  </div>
</template>

<script setup lang="ts">
import type { PlayerOptions, VideoProps } from './type'
import videoJs from 'video.js'
import 'video.js/dist/video-js.min.css'

const emits = defineEmits(['init'])
const props = defineProps<VideoProps>()
const videoRef = ref<HTMLDivElement>()
const playerRef = shallowRef<HTMLVideoElement>()
const videoInstance = shallowRef<any>()

const defaultOptions: PlayerOptions = {
  autoplay: false,
  controls: true,
  muted: false,
  loop: false,
  playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
  preload: 'auto',
  aspectRatio: '16:9',
  fluid: true,
}

watch(
  () => props.options,
  (newOptions) => {
    if (videoInstance.value) {
      videoInstance.value.pause()
      videoInstance.value.dispose()

      const newVideo = document.createElement('video')
      newVideo.className = 'video-js'
      videoRef.value!.appendChild(newVideo)
      playerRef.value = newVideo
      videoInstance.value = videoJs(
        playerRef.value,
        Object.assign(defaultOptions, newOptions),
      )
      emits('init', videoInstance.value)
    }
  },
)

watch(
  () => props.options?.sources,
  (sources) => {
    if (videoInstance.value) {
      // 暂停视频播放
      videoInstance.value.pause()
      videoInstance.value?.reset()
      videoInstance.value?.src(sources)
      videoInstance.value?.load()
    }
  },
  {
    deep: true,
  },
)

onMounted(() => {
  if (!playerRef.value) return
  videoInstance.value = videoJs(
    playerRef.value,
    Object.assign(defaultOptions, props.options),
  )
  emits('init', videoInstance.value)
})

onBeforeUnmount(() => {
  if (videoInstance.value) {
    videoInstance.value.dispose()
    videoInstance.value = null
  }
})
</script>

<style scoped></style>
