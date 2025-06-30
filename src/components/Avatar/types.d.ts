import { AvatarProps } from 'element-plus'
// import {ExtractPropTypes} from 'vue'

export interface DropdownMenuProps {
  /** how to trigger */
  trigger?: 'hover' | 'click' | 'contextmenu'
  triggerKeys?: string[]
  effect?: string
  /** menu button type, only works when split-button is true */
  type?: ButtonType
  /** placement of pop menu */
  placement?: Placement
  /** popper.js parameters */
  popperOptions?: Partial<Options>
  id?: string
  /** menu size, also works on the split button */
  size?: string
  /** whether a button group is displayed */
  splitButton?: boolean
  /** whether to hide menu after clicking menu-item */
  hideOnClick?: boolean
  loop?: boolean
  /** delay time before show a dropdown (only works when trigger is `hover`) */
  showTimeout?: number
  /** delay time before hide a dropdown (only works when trigger is `hover`) */
  hideTimeout?: number
  /** tabindex of Dropdown */
  tabindex?: number | string
  /** the max height of menu */
  maxHeight?: number | string
  /** custom class name for Dropdown's dropdown */
  popperClass?: string
  /** whether to disable */
  disabled?: boolean
  /** the ARIA role attribute for the dropdown menu */
  role?: string
  buttonProps?: Partial<ButtonProps>
  /** whether the dropdown popup is teleported to the body */
  teleported?: boolean
  /** when dropdown inactive and `persistent` is `false` , dropdown menu will be destroyed */
  persistent?: boolean
}

// method2:
// type DropdownMenuProps = ExtractPropTypes<typeof dropdownProps>

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
enum SizeEnum {
  large = 'large',
  default = 'default',
  small = 'small'
}

type DropDownMenuItem = string | number | {key: string | number | object, value: string}
export interface AvatarMenuProps extends DropdownMenuProps, Omit<AvatarProps, 'size'> {
  avatarSize: number | SizeEnum,
  data: DropDownMenuItem[],
  username: string
}