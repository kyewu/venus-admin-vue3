import type { CSSProperties } from 'vue';
import { RouteLocationRaw } from 'vue-router'

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

export interface DropDownProps<T> {
  items: T[]
  iconProps?: Partial<IconProps>
  iconClass?: string
  // current?: number
}

export interface MenuItemClicked {
  index: string
  indexPath: string[]
  route?: RouteLocationRaw
}

export type MenuSelectEvent = [
  index: string,
  indexPath: string[],
  item: any,
  routerResult?: Promise<void | any>
]
