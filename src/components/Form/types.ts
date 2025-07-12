import type { IconifyIcon } from "@iconify/vue"
import type { ColProps, FormProps as ElFormProps, FormItemInstance, FormItemProps, FormItemRule, FormMetaProps} from 'element-plus'
import type { CSSProperties, Component } from "vue"

export interface LoginItem {
  icon: IconifyIcon | string
  url: string,
}
export interface LoginFormProps {
  position?: 'left' | 'right' | 'center'
  title?: string
  loginItems?: LoginItem[]
}

export type ComponentType =
  | 'input'
  | 'button'
  | 'input-number'
  | 'select'
  | 'option'
  | 'text'
  | 'link'
  | 'rate'
  | 'slider'
  | 'switch'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'radio-button'
  | 'radio-group'
  | 'cascader'
  | 'color-picker'
  | 'time-picker'
  | 'time-select'
  | 'date-picker'
  | 'transfer'
  | 'avatar'
  | 'image'
  | 'progress'
  | 'tag'
  | 'timeline'
  | 'tree'
  | 'steps'
  | 'step'
  | ''
  | undefined


type FormItemChild = {
  type?: ComponentType
  label?: string
  value?: any
  [key: string]: any
}

type NewFormProps = ElFormProps & FormMetaProps
export interface VFormItemProp extends FormItemProps {
  type?: ComponentType
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
  defaultSlot?: Component
  errorSlot?: Component
  labelSlot?: Component
  prefixSlot?: Component
  suffixSlot?: Component
  // custom component
  itemRef?: (ref: FormItemInstance) => void
  childRef?: (ref: any) => void
}
export type VFormSchema = Array<VFormItemProp>
export interface VFormProps extends Partial<NewFormProps> {
  schema?: VFormSchema
  rowClass?: string
  rowStyle?: CSSProperties
}
