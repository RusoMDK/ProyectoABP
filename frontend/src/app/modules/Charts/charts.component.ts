/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Data/services/data.service';
import { DataS } from '../Data/Components/interface/data.interface';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  humidityData: any[] = [];
  soilMoistureData: any[] = [];
  temperatureCData: any[] = [];
  heatIndexCData: any[] = [];

  view: [number, number] = [300, 300]; // Ajustamos el tamaño del gráfico

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a6ce39', '#5AA454', '#C7B42C', '#FF8C00', '#FF6347']
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllStoredData().subscribe({
      next: (data: DataS[]) => {
        console.log('Data received:', data);
        this.processData(this.getLastDayAverages(data));
      },
      error: (error) => {
        console.error('Error al obtener datos almacenados:', error);
      }
    });
  }

  getLastDayAverages(data: DataS[]): DataS[] {
    const grouped: { [key: string]: { [key: string]: number[] } } = {};

    data.forEach(d => {
      const date = new Date(d.createdAt).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = {
          humedad: [],
          soilMoisture: [],
          temperaturaC: [],
          heatIndexC: []
        };
      }
      // Initialize the key if it doesn't exist
      if (!grouped[date][d.type]) {
        grouped[date][d.type] = [];
      }
      grouped[date][d.type].push(d.data);
    });

    const lastDate = Object.keys(grouped).sort().pop();
    const averagedData: DataS[] = [];

    if (lastDate) {
      Object.keys(grouped[lastDate]).forEach(type => {
        const values = grouped[lastDate][type];
        if (values.length > 0) {
          const average = values.reduce((a, b) => a + b, 0) / values.length;
          if (!isNaN(average)) {
            averagedData.push({
              type: type,
              data: average,
              id: Date.parse(lastDate),
              createdAt: new Date(lastDate)
            });
          } else {
            console.warn(`Invalid average value for ${type} on ${lastDate}: ${average}`);
          }
        }
      });
    }

    console.log('Averaged Data for Last Day:', averagedData);
    return averagedData;
  }

  convertSoilMoistureToPercentage(value: number): number {
    const min = 1751;
    const max = 4095;
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  processData(data: DataS[]) {
    data.forEach(d => {
      const newDataPoint = { name: d.createdAt.toISOString(), value: d.data };

      console.log(`Processing data: ${d.type} - ${d.data} at ${d.createdAt}`);

      switch (d.type) {
        case 'humedad':
          this.humidityData = [{ name: 'Humedad', value: d.data }];
          break;
        case 'soilMoisture':
          const soilMoisturePercentage = this.convertSoilMoistureToPercentage(d.data);
          this.soilMoistureData = [{ name: 'Humedad del Suelo', value: soilMoisturePercentage }];
          break;
        case 'temperaturaC':
          this.temperatureCData = [{ name: 'Temperatura (°C)', value: d.data }];
          break;
        case 'heatIndexC':
          this.heatIndexCData = [{ name: 'Índice de Calor (°C)', value: d.data }];
          break;
        default:
          console.warn(`Unknown data type: ${d.type}`);
          break;
      }
    });
  }
}
