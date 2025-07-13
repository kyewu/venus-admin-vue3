import { init } from 'echarts/core'
import type { SetOptionOpts } from 'echarts/core'
import type { CSSProperties } from 'vue';

type InitType = typeof init;
type InitParameters = Parameters<InitType>;
type InitOptions = NonNullable<InitParameters[2]>;
type UpdateOptions = SetOptionOpts;
type AutoResize =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

type EChartsType = ReturnType<InitType>;
type SetOptionType = EChartsType["setOption"];
type Option = Parameters<SetOptionType>[0];

interface EChartProps {
  initOptions: InitOptions
  updateOptions: UpdateOptions
  loadingOptions: LoadingOptions
  option: Option
  autoresize: AutoResize
  loading: boolean
  group: string
  manualUpdate: boolean
}

export interface VEChartProps extends Partial<EChartProps> {
  theme?: 'dark' | 'default' | string
  style?: CSSProperties
  height?: string | number
  chart?: string
  components?: string[]
  option?: Option
}
