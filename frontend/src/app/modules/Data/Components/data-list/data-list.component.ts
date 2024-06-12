
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataS } from '../interface/data.interface';
import { TableActionEvent } from '../interface/table-action-event.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {


  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly DataS[] = [];
  listOfData: DataS[] = [];
  filteredData: DataS[] = [];
  activeFilters: { [key: string]: { value: string, condition: string } } = {};
  selectedFilters: { key: string, display: string }[] = [];

  setOfCheckedId = new Set<number>();
  tableColumns = [
    { key: 'id', display: 'Id', showSwitch: false, checked: false },
    { key: 'type', display: 'Tipo', showSwitch: false, checked: false },
    { key: 'data', display: 'Parametro', showSwitch: false, checked: false },
    { key: 'createdAt', display: 'Fecha de creacion', showSwitch: false, checked: false },

  ];

  constructor(private notification: NzNotificationService, private datasService: DataService, private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.loadHelp();
  }

  loadHelp(): void {
    this.datasService.get().subscribe(results => {
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
    const data = this.listOfData.find(data => data.id === event.id);
    if (data) {
      if (event.propertyName in data) {
        (data as any)[event.propertyName] = event.isChecked;
      }


      this.datasService.update(data.id, data).subscribe(() => {
        console.log(`Modelo de importacion "${data.type}"actualizado en la base de datos`);
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
    // encontrar el examen para obtener su nombre antes de borrarlo
    const data = this.listOfData.find(item => String(item.id) === String(id));
    if (!data) {
      this.notification.error('Error', 'Modelo de Exportar no encontrado.');
      return;
    }
  }

  sortDataByCode(): void {
    this.listOfData.sort((a, b) => {
      return Number(a.id) - Number(b.id);
    });
  }

  
  subscribe() {
    this.datasService.subscribeToTopic().subscribe(response => {
      console.log(response); // Aquí puedes manejar la respuesta del backend
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
          this.deleteData(event.id);
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