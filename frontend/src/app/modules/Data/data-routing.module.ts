import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './Components/data-list/data-list.component';
const routes: Routes = [
  {
    path: '',
    component: DataListComponent,
    children:[
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}