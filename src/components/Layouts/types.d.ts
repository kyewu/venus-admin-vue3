import type { LocaleItem, ThemeSettingsProps } from '../Themes/types';
import type { AvatarMenuProps } from '../Avatar/types';
import type { TabPaneName, TabsPaneContext, TabsProps } from 'element-plus'
import type { AppRouteMenuItem } from '../Menu/types'

export interface HeaderProps extends Partial<AvatarMenuProps> {
  collapse: boolean,
  showCollapse: boolean,
  locales: LocaleItem[],
  settings?: ThemeSettingsProps
}

export interface HeaderTabsProps extends Partial<TabsProps> {
  data: AppRouteMenuItem[]
}

export type HeaderTabEvents = {
  tabClick: [pane: TabsPaneContext, ev: Event]
  tabChange: [pane: TabsPaneContext, ev: Event]
  tabRemove: [name: TabPaneName]
  tabAdd: []
  edit: [paneName: TabPaneName | undefined, action: 'remove' | 'add']
  tabMenuClick: [action: TabActions]
}
