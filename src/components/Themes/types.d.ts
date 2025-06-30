import type { IconifyIcon } from '@iconify/vue';

export interface LocaleItem {
  text: string
  icon?: IconifyIcon | string
  name: string // the file name under locales
}

export interface ChangeLocaleProps {
  locales: LocaleItem[]
}