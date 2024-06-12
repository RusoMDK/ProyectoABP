import { ILeftMenuSubItem } from './ILeftMenuSubItem';

export interface ILeftMenuItem {
  name: string;
  sub_menus: ILeftMenuSubItem[];
  icon?: string;
  open?: boolean;
  disabled?: boolean;
  domain?: string;
}
