import type { IconProps as IconPropsOrigin } from '@iconify/vue'

export type IconProps = IconPropsOrigin

export interface IconPickerSubmitDataProps {
  icon: string
  color: string
  fontSize: number
}


export interface IconListProps {
  iconData: string[]
  collection: string
  itemClass: string
  iconClass: string
  activeClass: string
  showText: boolean
}