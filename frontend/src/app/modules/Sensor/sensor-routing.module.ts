import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorListComponent } from './Components/sensor-list/sensor-list.component';
import { AddEditSensorComponent } from './Components/add-edit-sensor/add-edit-sensor.component';
import { SensorComponent } from './Components/sensor.component';
const routes: Routes = [
  {
    path: '',
    component:SensorComponent ,
    children:[
      {
        path: 'add-edit-sensor',
        component: AddEditSensorComponent,
      },
      {
        path: 'list-sensors',
        component: SensorListComponent,
      },
      {
        path: 'add-edit-sensor/:id',
        component: AddEditSensorComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorRoutingModule {}