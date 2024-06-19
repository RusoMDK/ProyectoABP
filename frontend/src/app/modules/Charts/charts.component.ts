/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Data/services/data.service';
import { DataS } from '../Data/Components/interface/data.interface';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  humidityGaugeData: number = 0;
  soilMoistureGaugeData: number = 0;
  temperatureGaugeData: number = 0;
  heatIndexGaugeData: number = 0;
  humidityLineChartData: any[] = [];
  soilMoistureLineChartData: any[] = [];
  temperatureLineChartData: any[] = [];
  heatIndexLineChartData: any[] = [];
  day: string = '';

  view: [number, number] = [200, 200]; // Tamaño del gráfico
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a6ce39', '#5AA454', '#C7B42C', '#FF8C00', '#FF6347']
  };

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.loadData(new Date().toISOString().split('T')[0]);
  }

  loadData(day: string): void {
    this.dataService.getDataByDay(new Date(day)).subscribe({
      next: (data: DataS[]) => {
        console.log('Datos recibidos para el día seleccionado:', data);
        this.processData(this.groupDataByInterval(data, 5));
      },
      error: (error) => {
        console.error('Error al obtener datos para la fecha seleccionada:', error);
      }
    });
  }

  groupDataByInterval(data: DataS[], intervalMinutes: number): DataS[] {
    const grouped: { [key: string]: { [key: string]: number[] } } = {};

    data.forEach(d => {
      const date = new Date(d.createdAt);
      const roundedDate = new Date(Math.floor(date.getTime() / (intervalMinutes * 60 * 1000)) * (intervalMinutes * 60 * 1000));
      const dateString = roundedDate.toISOString();

      if (!grouped[dateString]) {
        grouped[dateString] = {
          humedad: [],
          soilMoisture: [],
          temperaturaC: [],
          heatIndexC: []
        };
      }
      // Initialize the key if it doesn't exist
      if (!grouped[dateString][d.type]) {
        grouped[dateString][d.type] = [];
      }
      grouped[dateString][d.type].push(d.data);
    });

    const averagedData: DataS[] = [];

    Object.keys(grouped).forEach(dateString => {
      const entry = grouped[dateString];
      Object.keys(entry).forEach(type => {
        const values = entry[type];
        if (values.length > 0) {
          const average = values.reduce((a, b) => a + b, 0) / values.length;
          if (!isNaN(average)) {
            averagedData.push({
              type: type,
              data: average,
              id: Date.parse(dateString),
              createdAt: new Date(dateString)
            });
          } else {
            console.warn(`Valor promedio inválido para ${type}`);
          }
        }
      });
    });

    console.log('Datos promediados para cada intervalo:', averagedData);
    return averagedData;
  }

  processData(data: DataS[]): void {
    this.humidityGaugeData = 0;
    this.soilMoistureGaugeData = 0;
    this.temperatureGaugeData = 0;
    this.heatIndexGaugeData = 0;

    this.humidityLineChartData = [];
    this.soilMoistureLineChartData = [];
    this.temperatureLineChartData = [];
    this.heatIndexLineChartData = [];

    data.forEach(d => {
      switch (d.type) {
        case 'humedad':
          this.humidityGaugeData = d.data;
          this.humidityLineChartData.push({
            name: new Date(d.createdAt).toLocaleTimeString(),
            value: d.data
          });
          break;
        case 'soilMoisture':
          this.soilMoistureGaugeData = this.convertSoilMoistureToPercentage(d.data);
          this.soilMoistureLineChartData.push({
            name: new Date(d.createdAt).toLocaleTimeString(),
            value: this.convertSoilMoistureToPercentage(d.data)
          });
          break;
        case 'temperaturaC':
          this.temperatureGaugeData = d.data;
          this.temperatureLineChartData.push({
            name: new Date(d.createdAt).toLocaleTimeString(),
            value: d.data
          });
          break;
        case 'heatIndexC':
          this.heatIndexGaugeData = d.data;
          this.heatIndexLineChartData.push({
            name: new Date(d.createdAt).toLocaleTimeString(),
            value: d.data
          });
          break;
        default:
          console.warn(`Tipo de datos desconocido: ${d.type}`);
          break;
      }
    });

    console.log('Datos procesados:', {
      humidityGaugeData: this.humidityGaugeData,
      soilMoistureGaugeData: this.soilMoistureGaugeData,
      temperatureGaugeData: this.temperatureGaugeData,
      heatIndexGaugeData: this.heatIndexGaugeData,
      humidityLineChartData: this.humidityLineChartData,
      soilMoistureLineChartData: this.soilMoistureLineChartData,
      temperatureLineChartData: this.temperatureLineChartData,
      heatIndexLineChartData: this.heatIndexLineChartData
    });
  }

  onDateSelected(date: string): void {
    console.log('Fecha seleccionada:', date);
    this.loadData(date);
  }

  convertSoilMoistureToPercentage(value: number): number {
    const min = 1751;
    const max = 4095;
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }
}
