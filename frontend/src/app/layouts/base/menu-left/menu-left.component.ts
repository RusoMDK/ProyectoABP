import { Component, Input } from '@angular/core';
import { ILeftMenuItem } from '../../interfaces/ILeftMenuItem';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent {
  @Input() isCollapsedLeft: boolean = false;

  organizationTab: ILeftMenuItem[] = [
    {
      name: 'Inicio',
      sub_menus: [],
      open: false,
      domain: 'welcome',
      icon: 'home', // Font Awesome icon
    },
    {
      name: 'Sensores',
      sub_menus: [],
      open: false,
      domain: 'sensors/list-sensors',
      icon: 'vial', // Font Awesome icon
    },
    {
      name: 'Dispositivos',
      sub_menus: [],
      open: false,
      domain: 'devices/list-device',
      icon: 'mobile-alt', // Font Awesome icon
    },
    {
      name: 'Escenarios',
      sub_menus: [],
      open: false,
      domain: 'escenary/list-escenary',
      icon: 'globe', // Font Awesome icon
    },
    {
      name: 'Datos de los sensores',
      sub_menus: [],
      open: false,
      domain: 'data',
      icon: 'database', // Font Awesome icon
    },
    {
      name: 'Usuarios',
      sub_menus: [],
      open: false,
      domain: 'user/list-user',
      icon: 'user', // Font Awesome icon
    },
    {
      name: 'Graficos',
      sub_menus: [],
      open: false,
      domain: 'charts',
      icon: 'chart-bar', // Font Awesome icon
    },
  ];

  username?: string;

  clickSingle(array: ILeftMenuItem[], reference: ILeftMenuItem) {
    array.forEach((item) => {
      if (item !== reference) item.open = false;
    });
  }
}
