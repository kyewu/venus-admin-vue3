<template>
  <div></div>
  <el-button type="primary" @click="changeSource">change source</el-button>
  <VueVideo :options="options"></VueVideo>
  <VECharts :option="option" theme="''"></VECharts>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import VECharts from '@/components/Chart/VECharts.vue'
import type { PlayerOptions } from '@/components/Video/type'

definePage({
  meta: {
    title: 'pages.home',
    icon: 'ep:home-filled',
  },
})
const options: Ref<PlayerOptions> = ref({
  sources: [
    {
      src: 'https://media.w3.org/2010/05/video/movie_300.mp4',
      type: 'video/mp4',
    },
    {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      type: 'video/mp4',
    },
  ],
})

const changeSource = () => {
  options.value.sources = [
    {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      type: 'video/mp4',
    },
  ]
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

const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
</script>

<style scoped lang="scss"></style>
