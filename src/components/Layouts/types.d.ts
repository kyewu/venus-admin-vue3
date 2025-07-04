import type { LocaleItem, ThemeSettingsProps } from '../Themes/types';
import type { AvatarMenuProps } from '../Avatar/types';

export interface HeaderProps extends Partial<AvatarMenuProps> {
  collapse: boolean,
  showCollapse: boolean,
  locales: LocaleItem[],
  settings?: ThemeSettingsProps
}