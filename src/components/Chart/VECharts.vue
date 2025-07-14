<template>
  <v-chart v-bind="props" :style="computedStyle" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
// import { PieChart } from "echarts/charts";
import * as Charts from 'echarts/charts'
import * as ChartsComponents from 'echarts/components'
import * as ChartsFeatures from 'echarts/features'
import VChart, { THEME_KEY } from 'vue-echarts'
import { provide } from 'vue'
import type { VEChartProps } from './type'
import { COMPONENTS_MAP, CHARTS_MAP } from './const'

provide(THEME_KEY, '')

const props = withDefaults(defineProps<VEChartProps>(), {
  theme: 'default',
  height: '400px',
  autoresize: true,
  chart: 'pie',
  components: () => ['TitleComponent', 'TooltipComponent', 'LegendComponent'],
})

const computedStyle = computed(() => {
  let result = {} as Record<string, any>
  const { theme, style, height } = props
  if (theme && theme.startsWith('#')) {
    result = { backgroundColor: theme }
  }
  result.height = typeof height === 'number' ? `${height}px` : height
  return { ...style, ...result }
})

onBeforeMount(() => {
  let deps: any[] = []
  if(props.option) {
    Object.keys(props.option).forEach((key) => {
     if (COMPONENTS_MAP[key]) {
       deps.push(COMPONENTS_MAP[key]);
     }
   });
  }
  if(props.components?.length){
    deps = props.components.map((o) => ChartsComponents[o])
  }
  let type = 'pie'
  const series = Array.isArray(props?.option?.series) ? props?.option?.series[0] : props?.option?.series
  type = series?.type || 'pie'

   // Features
   const features: string[] = [];
    if (series.labelLayout) {
      features.push("LabelLayout");
    }
    if (series.universalTransition) {
      features.push("UniversalTransition");
    }
  use([
  CanvasRenderer,
  Charts[CHARTS_MAP[type]],
  ...deps,
  ...features.map((f) => ChartsFeatures[f]),
])
})
</script>

<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>
