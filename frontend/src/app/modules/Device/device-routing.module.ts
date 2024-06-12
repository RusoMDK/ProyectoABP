import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './Components/device-list/device-list.component';
import { AddEditDeviceComponent } from './Components/add-edit-device/add-edit-device.component';
import { DeviceComponent } from './Components/device.component';
const routes: Routes = [
  {
    path: '',
    component:DeviceComponent ,
    children:[
      {
        path: 'add-edit-device',
        component: AddEditDeviceComponent,
      },
      {
        path: 'add-edit-device/:id',
        component: AddEditDeviceComponent,
      },
      {
        path: 'list-device',
        component: DeviceListComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}