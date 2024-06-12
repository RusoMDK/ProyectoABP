import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from './Components/table-data/table.component';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterPanelComponent } from './Components/filter-panel/filter-panel.component';
import { DataListComponent } from './Components/data-list/data-list.component';
import { DataRoutingModule } from './data-routing.module';
@NgModule({
  declarations: [FilterPanelComponent,BreadcrumbComponent,TableDataComponent,DataListComponent],
  imports: [CommonModule,CoreModule,DataRoutingModule],
})
export class DataModule {}