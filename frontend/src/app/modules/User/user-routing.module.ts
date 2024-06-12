import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AddEditUserComponent } from './Components/add-edit-user/add-edit-user.component';
import { UserComponent } from './Components/user.component';
import { UserListComponent } from './Components/user-list/user-list.component';
const routes: Routes = [
  {
    path: '',
    component:UserComponent,
    children:[
      {
        path: 'add-edit-user',
        component: AddEditUserComponent,
      },
      {
        path: 'list-user',
        component: UserListComponent,
      },
      {
        path: 'add-edit-user/:id',
        component: AddEditUserComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}