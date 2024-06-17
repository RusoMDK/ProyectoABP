import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugeModule } from 'angular-gauge';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NgxChartsModule,
    GaugeModule.forRoot()
  ],
  exports: [ChartsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChartsModule { }
