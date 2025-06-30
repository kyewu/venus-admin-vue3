import type { IconifyIcon } from '@iconify/vue';
import type { IconProps } from '../Icon/types';
import { TransitionNameEnum } from "./constant"

export interface LocaleItem {
  text: string
  icon?: IconifyIcon | string
  name: string // the file name under locales
}

export interface ChangeLocaleProps extends Partial<IconProps> {
  locales: LocaleItem[],
  iconClass?: string
}

export interface ThemeSettingsProps {
  theme: string
  backgroundColor: string
  darkMode: boolean
  menuWidth?: number
  showLogo: boolean
  showTabs: boolean
  fixedHead: boolean
  showBreadcrumb: boolean
  mode: 'sidebar' | 'mix' | 'top' | 'mixbar'
  transition: TransitionNameEnum
}