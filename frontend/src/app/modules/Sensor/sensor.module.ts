import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterPanelComponent } from './Components/filter-panel/filter-panel.component';
import { SensorRoutingModule } from './sensor-routing.module';
import { AddEditSensorComponent } from './Components/add-edit-sensor/add-edit-sensor.component';
import { SensorListComponent } from './Components/sensor-list/sensor-list.component';
import { TableSensorComponent } from './Components/table-sensor/table-sensor.component';
import { SensorComponent } from './Components/sensor.component';
@NgModule({
  declarations: [FilterPanelComponent,BreadcrumbComponent,SensorComponent,AddEditSensorComponent,TableSensorComponent,SensorListComponent],
  imports: [CommonModule,CoreModule,SensorRoutingModule],
})
export class SensorModule {}