import type { IconifyIcon, IconProps } from "@iconify/vue";
import type { BadgeProps, TagProps, AvatarProps } from "element-plus";
import type { CSSProperties } from "vue";

export interface NotificationProps extends Partial<BadgeProps> {
  icon: string | IconifyIcon
  iconSize?: number
  iconColor?: string
  size: number
  scale: number
  color: string
}

export interface MessageListItem {
  avatar?: Partial<AvatarProps>
  title: string
  content?: string
  time?: string
  tagProps?: Partial<TagProps>
  tag?: string
}

export interface NoticeActionsItem extends Partial<IconProps> {
  title: string
  click: () => void
}

export interface NoticeMessageListOptions {
  title: string
  contents?: MessageListItem[]
}

export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionsItem[]
  wrapClass?: string
  wrapStyle?: CSSProperties
}

export interface NoticeProps extends NoticeMessageListProps, Partial<NotificationProps> { }
