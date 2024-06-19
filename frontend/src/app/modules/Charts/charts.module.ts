import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugeModule } from 'angular-gauge';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { DatePickerModalComponent } from './Components/date-picker-modal/date-picker-modal.component';
import { FormsModule } from '@angular/forms';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  declarations: [
    ChartsComponent,
    BreadcrumbComponent,
    DatePickerModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChartsRoutingModule,
    NgxChartsModule,
    NgxGaugeModule,
    GaugeModule.forRoot()
    
  ],
  exports: [
    ChartsComponent,
    BreadcrumbComponent,
    DatePickerModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChartsModule { }
