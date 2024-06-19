/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TableActionEvent } from '../interface/table-action-event.model';
import { DeviceService } from '../../services/device.service';
import { Devices } from '../interface/device.interface';
import { AddEditDeviceComponent } from '../add-edit-device/add-edit-device.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {


  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Devices[] = [];
  listOfData: Devices[] = [];
  filteredData: Devices[] = [];
  activeFilters: { [key: string]: { value: string, condition: string } } = {};
  selectedFilters: { key: string, display: string }[] = [];

  setOfCheckedId = new Set<number>();
  tableColumns = [
    { key: 'id', display: 'Id', showSwitch: false, checked: false },
    { key: 'user', display: 'Usuario', showSwitch: false, checked: false },
    { key: 'name', display: 'Nombre', showSwitch: false, checked: false },

  ];

  constructor(
    private notification: NzNotificationService, 
    private deviceService: DeviceService, 
    private router: Router, 
    private modalService: NzModalService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loadHelp();
  }

  loadHelp(): void {
    this.deviceService.get().subscribe(results => {
      this.listOfData = results;
      console.log(this.listOfData)
      this.filteredData = [...this.listOfData]; // Inicialmente, la lista filtrada es igual a la lista completa
      this.sortDataByCode();
    });
  }

  applyFilter(event: { key: string, value: string, condition: string }): void {
    this.activeFilters[event.key] = { value: event.value, condition: event.condition };
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredData = this.listOfData.filter(item => {
      return Object.keys(this.activeFilters).every(key => {
        const filterValue = this.activeFilters[key].value.toLowerCase();
        const condition = this.activeFilters[key].condition;
        const itemValue = (item as any)[key]?.toString().toLowerCase() || '';

        switch (condition) {
          case 'contains':
            return itemValue.includes(filterValue);
          case 'equals':
            return itemValue === filterValue;
          case 'notContains':
            return !itemValue.includes(filterValue);
          default:
            return true;
        }
      });
    });
  }

  openAddEditDeviceModal(): void {
    this.modal.create({
      nzTitle: 'Agregar o Editar Dispositivo',
      nzContent: AddEditDeviceComponent,
      nzFooter: null
      
    });
  }

  deleteDevice(id: number): void {
    const device = this.listOfData.find(item => String(item.id) === String(id));
    if (!device) {
      this.notification.error('Error', 'Dispositivo no encontrado.');
      return;
    }

    this.deviceService.delete(id).subscribe(() => {
      this.listOfData = this.listOfData.filter(item => item.id !== id);

      // Enviar notificación de éxito
      this.notification.success('Dispositivo', `El Dispositivo"${device.name}" ha sido eliminado exitosamente.`);
    }, error => {
      // Manejar el error en caso de que algo falle durante el proceso de borrado
      this.notification.error('Error al Borrar', `Ha ocurrido un error al intentar borrar el dispositivo: "${device.name}"`);
    });
  }

  toggleFilter(key: string): void {
    const filter = this.tableColumns.find(column => column.key === key);
    if (!filter) return;

    const index = this.selectedFilters.findIndex(selectedFilter => selectedFilter.key === key);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(filter);
    }

    // Forzar la actualización de Angular para reflejar los cambios
    this.selectedFilters = [...this.selectedFilters];
  }

  onFilterRemoved(key: string): void {
    // Eliminar el filtro de activeFilters
    delete this.activeFilters[key];

    // Actualiza los filtros seleccionados
    this.selectedFilters = this.selectedFilters.filter(filter => filter.key !== key);

    // Actualizar también la lista de columnas de la tabla para desmarcar el checkbox
    this.tableColumns = this.tableColumns.map(column => {
      if (column.key === key) {
        return { ...column, checked: false };
      }
      return column;
    });

    // Aplicar filtros actualizados a tus datos
    this.applyFilters();
  }

  // Método para manejar el evento de restablecimiento de filtros
  onFiltersReset(): void {
    this.loadHelp();
  }
  

  handleSelectAllChange(value: boolean): void {
    // Lógica para seleccionar o deseleccionar todas las filas
    if (value) {
      // Seleccionar todas las filas
      this.setOfCheckedId = new Set<number>(this.listOfCurrentPageData.map(item => Number(item.id)));
    } else {
      // Deseleccionar todas las filas
      this.setOfCheckedId.clear();
    }
  }


  switchChanged(event: { id: number, propertyName: string, isChecked: boolean }): void {
    const device = this.listOfData.find(device => device.id === event.id);
    if (device) {
      if (event.propertyName in device) {
        (device as any)[event.propertyName] = event.isChecked;
      }


      this.deviceService.update(device.id, device).subscribe(() => {
        console.log(`Modelo de Dispositivos "${device.name}"actualizado en la base de datos`);
      });
    }
  }

  onSetOfCheckedIdChange(setOfCheckedId: Set<number>): void {
    this.setOfCheckedId = new Set<number>(setOfCheckedId);
    console.log("setofcheked");
    console.log(setOfCheckedId);
  }

  confirmDeleteExamination(id: number): void {
    this.modalService.confirm({
      nzTitle: '¿Estás seguro?',
      nzContent: 'Esta acción eliminará permanentemente el examen. ¿Estás seguro de que deseas continuar?',
      nzCancelText: 'Cancelar',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteData(id),
    });
  }

  deleteData(id: number): void {
    const data = this.listOfData.find(item => item.id === id);
    if (!data) {
      this.notification.error('Error', 'Documento de ayuda no encontrado.');
      return;
    }

    this.deviceService.delete(id).subscribe(() => {
      // Ahora que el examen se ha borrado exitosamente, eliminarlo de la lista de datos
      this.listOfData = this.listOfData.filter(item => item.id !== id);

      // Enviar notificación de éxito
      this.notification.success('Dispositivo', `El Dispositivo"${data.name}" ha sido eliminado exitosamente.`);
    }, error => {
      // Manejar el error en caso de que algo falle durante el proceso de borrado
      this.notification.error('Error al Borrar', `Ha ocurrido un error al intentar borrar el dispositivo: "${data.name}"`);
    });
  }

  sortDataByCode(): void {
    this.listOfData.sort((a, b) => {
      return Number(a.id) - Number(b.id);
    });
  }

  
  handleTableAction(event: TableActionEvent): void {
    switch (event.action) {
      case 'delete':
        if (typeof event.id === 'number') {
          this.confirmDeleteExamination(event.id);
        }
        break;
      case 'deleteSelected':
        if (typeof event.id === 'number') {
          this.deleteDevice(event.id);
        }
        break;
      case 'onAllChecked':
        if (typeof event.checked === 'boolean') {
          this.handleSelectAllChange(event.checked);
        }
        break;
      case 'switchChange':
        if (typeof event.id === 'number' && typeof event.propertyName === 'string' && typeof event.checked === 'boolean') {
          // Aquí se maneja el cambio de estado para el switch.
          // Se pasa un objeto con las propiedades id, propertyName  y isChecked
          this.switchChanged({ id: event.id, propertyName: event.propertyName, isChecked: event.checked });
        }
        break;
      // Manejar otros casos según sea necesario
    }
  }
}