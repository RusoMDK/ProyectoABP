/* eslint-disable @typescript-eslint/no-inferrable-types */
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
      name: 'Sensores',
      sub_menus: [
      ],
      open: false,
      domain: 'sensors/list-sensors',
    },
    {
      name: 'Dispositivos',
      sub_menus: [
      ],
      open: false,
      domain: 'devices/list-device',
    },
    {
      name: 'Escenarios',
      sub_menus: [
      ],
      open: false,
      domain: 'escenary/list-escenary',
    },
    {
      name: 'Datos de los sensores',
      sub_menus: [],
      open: false,
      domain: 'data',
    },
    {
      name: 'Usuarios',
      sub_menus: [],
      open: false,
      domain: 'user/list-user',
    },
    {
      name: 'Graficos',
      sub_menus: [],
      open: false,
      domain: 'charts',
    },
  ];

  username?: string;

  clickSingle(array: ILeftMenuItem[], reference: ILeftMenuItem) {
    array.forEach((item) => {
      if (item !== reference) item.open = false;
    });
  }
}
