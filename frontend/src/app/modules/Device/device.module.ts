import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterPanelComponent } from './Components/filter-panel/filter-panel.component';
import { TableDeviceComponent } from './Components/table-device/table-device.component';
import { DeviceListComponent } from './Components/device-list/device-list.component';
import { AddEditDeviceComponent } from './Components/add-edit-device/add-edit-device.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './Components/device.component';
@NgModule({
  declarations: [FilterPanelComponent,BreadcrumbComponent,DeviceComponent,AddEditDeviceComponent,TableDeviceComponent,DeviceListComponent],
  imports: [CommonModule,CoreModule,DeviceRoutingModule],
})
export class DeviceModule {}