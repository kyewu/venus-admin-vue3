import type { IconifyIcon } from "@iconify/vue"

export interface LoginItem {
  icon: IconifyIcon | string
  url: string,
}
export interface LoginFormProps {
  position?: 'left' | 'right' | 'center'
  title?: string
  loginItems?: LoginItem[],
  [key: string]: any
}