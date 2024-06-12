import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterPanelComponent } from './Components/filter-panel/filter-panel.component';
import { AddEditUserComponent } from './Components/add-edit-user/add-edit-user.component';
import { TableUserComponent } from './Components/table-user/table-user.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './Components/user.component';
@NgModule({
  declarations: [FilterPanelComponent,BreadcrumbComponent,UserComponent,AddEditUserComponent,TableUserComponent,UserListComponent],
  imports: [CommonModule,CoreModule,UserRoutingModule],
})
export class UserModule {}