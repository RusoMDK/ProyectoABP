
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TableActionEvent } from '../interface/table-action-event.model';
import { User } from '../interface/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly User[] = [];
  listOfData: User[] = [];
  filteredData: User[] = [];
  activeFilters: { [key: string]: { value: string, condition: string } } = {};
  selectedFilters: { key: string, display: string }[] = [];

  setOfCheckedId = new Set<number>();
  tableColumns = [
    { key: 'id', display: 'Id', showSwitch: false, checked: false },
    { key: 'name', display: 'Nombre', showSwitch: false, checked: false },
    { key: 'username', display: 'Nombre de usuario', showSwitch: false, checked: false },
    { key: 'email', display: 'Correo', showSwitch: false, checked: false },

  ];

  constructor(private notification: NzNotificationService, private userService: UserService, private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.loadHelp();
  }

  loadHelp(): void {
    this.userService.get().subscribe(results => {
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

  deleteUser(id: number): void {
    // encontrar el User para obtener su nombre antes de borrarlo
    const user = this.listOfData.find(item => item.id === id);
    if (!user) {
      this.notification.error('Error', 'User no encontrado.');
      return;
    }

    this.userService.delete(id).subscribe(() => {
      this.listOfData = this.listOfData.filter(item => item.id !== id);

      // Enviar notificación de éxito
      this.notification.success('User', `El User"${user.name}" ha sido eliminado exitosamente.`);
    }, error => {
      // Manejar el error en caso de que algo falle durante el proceso de borrado
      this.notification.error('Error al Borrar', `Ha ocurrido un error al intentar borrar el dispositivo: "${user.name}"`);
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
    const user = this.listOfData.find(User => User.id === event.id);
    if (user) {
      if (event.propertyName in user) {
        (user as any)[event.propertyName] = event.isChecked;
      }


      this.userService.update(user.id, user).subscribe(() => {
        console.log(`Users "${user.name}"actualizado en la base de datos`);
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
      nzOnOk: () => this.deleteUser(id),
    });
  }

  deleteData(id: number): void {
    // encontrar el examen para obtener su nombre antes de borrarlo
    const device = this.listOfData.find(item => String(item.id) === String(id));
    if (!device) {
      this.notification.error('Error', 'User no encontrado.');
      return;
    }
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
          this.deleteUser(event.id);
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