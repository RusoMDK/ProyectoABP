import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  permissions$!: string[];
  permissionsActions$!: string[];

  constructor(
    private permissions: NgxPermissionsService,
    private http: HttpClient,
    private roles: NgxRolesService,
  ) {}

  setPermissions(permissionModules: string[]) {
    localStorage.setItem('permissions', JSON.stringify(permissionModules));

    this.permissions.addPermission(this.permissions$);
  }

  getPermissions(): string[] {
    return JSON.parse(localStorage.getItem('permissions') as string);
  }

  flushPermissions() {
    localStorage.removeItem('permissions');
    localStorage.removeItem('permissionActions');
    this.roles.flushRoles();
    this.permissions.flushPermissions();
  }
}
