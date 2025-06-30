import type { CSSProperties } from 'vue';

interface RouteMeta {
  layout?: string
  title?: string
  icon?: string | IconifyIcon
  order?: number
  hidden?: boolean
  disabled?: boolean
  [key: string]: any
}

type Component<T> = ReturnType<typeof defineComponent> | (() => Promise<T>) | (() => Promise<typeof import('*.vue')>)

export interface AppRouteMenuItem {
  name: string | symbol
  meta?: RouteMeta
  children?: AppRouteMenuItem[]
  alias?: string | string[]
  path: string,
  component?: Component<any>
}

export interface IconOptions {
  style: CSSProperties
  class: string
}