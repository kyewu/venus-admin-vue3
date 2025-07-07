import type { IconifyIcon } from "@iconify/vue"
import type { FormProps as ElFormProps, FormItemProps, FormMetaProps} from 'element-plus'

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

type NewFormProps = ElFormProps & FormMetaProps
export interface VFormItemProp extends FormItemProps {
  type?: string
  prop?: string
  // emit events
  events?: any
  // self extensions
  attrs?: any
}
export type VFormSchema = Array<VFormItemProp>
export interface VFormProps extends Partial<NewFormProps> {
  schema?: VFormSchema
}