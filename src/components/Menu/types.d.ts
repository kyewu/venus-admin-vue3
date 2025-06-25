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
  name: string
  meta?: RouteMeta
  children?: AppRouteMenuItem[]
  alias?: string
  path: string,
  component?: Component<any>
}