import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartComponent {
    colorScheme: Color = {
        name: 'custom',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      };
    
  lineChartData = [
    {
      "name": "Temperature",
      "series": [
        { "name": "2023-01-01", "value": 20 },
        { "name": "2023-01-02", "value": 25 },
        { "name": "2023-01-03", "value": 15 }
      ]
    }
  ];

  areaChartData = [
    {
      "name": "Humidity",
      "series": [
        { "name": "2023-01-01", "value": 30 },
        { "name": "2023-01-02", "value": 50 },
        { "name": "2023-01-03", "value": 40 }
      ]
    }
  ];

  gaugeChartData = [
    { "name": "pH", "value": 55 },
    { "name": "Illumination", "value": 70 }
  ];

  barChartData = [
    {
      "name": "Voltage",
      "series": [
        { "name": "2023-01-01", "value": 10 },
        { "name": "2023-01-02", "value": 12 },
        { "name": "2023-01-03", "value": 8 }
      ]
    }
  ];
}
