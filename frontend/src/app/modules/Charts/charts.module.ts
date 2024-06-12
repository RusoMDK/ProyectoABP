import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './charts.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule,CoreModule,NgxChartsModule],
})
export class ChartsModule {}