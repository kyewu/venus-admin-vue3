import type { IconifyIcon } from "@iconify/vue"
import type { ColProps, FormProps as ElFormProps, FormItemProps, FormItemRule, FormMetaProps} from 'element-plus'
import type { CSSProperties } from "vue"

export interface LoginItem {
  icon: IconifyIcon | string
  url: string,
}
export interface LoginFormProps {
  position?: 'left' | 'right' | 'center'
  title?: string
  loginItems?: LoginItem[]
}

type FormItemChild = {
  type?: any
  label?: string
  value?: any
  [key: string]: any
}

type NewFormProps = ElFormProps & FormMetaProps
export interface VFormItemProp extends FormItemProps {
  type?: string
  prop?: string
  value?: any
  // emit events
  events?: any
  // self extensions
  attrs?: any,
  span?: number
  colProps?: ColProps
  children?: FormItemChild[]
  schema?: VFormSchema
  rules?: FormItemRule[]
}
export type VFormSchema = Array<VFormItemProp>
export interface VFormProps extends Partial<NewFormProps> {
  schema?: VFormSchema
  rowClass?: string
  rowStyle?: CSSProperties
}
