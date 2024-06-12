import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEscenaryComponent } from './Components/add-edit-escenary/add-edit-escenary.component';
import { EscenaryListComponent } from './Components/escenary-list/escenary-list.component';
import { EscenaryComponent } from './Components/escenary.component';
const routes: Routes = [
  {
    path: '',
    component:EscenaryComponent,
    children:[
      {
        path: 'add-edit-escenary',
        component: AddEditEscenaryComponent,
      },
      {
        path: 'list-escenary',
        component: EscenaryListComponent,
      },
      {
        path: 'add-edit-escenary/:id',
        component: AddEditEscenaryComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscenaryRoutingModule {}