import type { IconifyIcon } from '@iconify/vue';
import type { IconProps } from '../Icon/types';

export interface LocaleItem {
  text: string
  icon?: IconifyIcon | string
  name: string // the file name under locales
}

export interface ChangeLocaleProps extends Partial<IconProps>{
  locales: LocaleItem[],
  iconClass?: string
}