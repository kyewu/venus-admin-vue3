<template>
  <v-chart v-bind="props" :style="computedStyle"/>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide } from "vue";
import type { VEChartProps } from "./type";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, "");

const props = withDefaults(defineProps<VEChartProps>(), {
  theme: "default",
  height: "400px",
  autoresize: true,
  chart: "pie",
  components:() => ["title", "tooltip", "legend"]
});

const computedStyle = computed(() => {
  let result = {} as Record<string, any>
  const { theme, style, height } = props
  if (theme && theme.startsWith('#')) {
    result = { backgroundColor: theme }
  }
  result.height = typeof height === 'number' ? `${height}px` : height
  return { ...style, ...result }
})
</script>

<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>
