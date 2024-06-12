import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { formatDate } from '@angular/common'; 
import { TableActionEvent } from '../interface/table-action-event.model';
import { UserService } from '../../services/user.service';
interface TableColumn {
  key: string;
  display: string;
  showSwitch: boolean;
}

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnChanges,OnInit {
  @Input() listOfData: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() listOfCurrentPageData: readonly any[] = [];
  @Output() setOfCheckedIdChange: EventEmitter<Set<number>> = new EventEmitter<Set<number>>();
  @Output() actionEvent = new EventEmitter<TableActionEvent>();

  loading = false;  // Añadir la propiedad loading

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listOfData'] && changes['listOfData'].currentValue) {
      this.loading = false;  
    }
  }

  ngOnInit(): void {
    this.userService.get().subscribe(response => {
      this.listOfData = response;
    });
  }
  
  

  formatDate(date: Date | string, format: string, locale: string): string {
    return formatDate(date, format, locale);
  }

  show(id: number): void {
    const ids = Number(id)
    this.actionEvent.emit({ action: 'show', id: ids });
  }

  edit(id: number): void {
    const ids = Number(id)
    this.actionEvent.emit({ action: 'edit', id: ids });
  }

  delete(id: number): void {
    const ids = Number(id)
    this.actionEvent.emit({ action: 'delete', id: ids });
  }

      

  deleteSelected(): void {
    const selectedIds = Array.from(this.setOfCheckedId);
    selectedIds.forEach(id => {
      this.actionEvent.emit({ action: 'deleteSelected', id: id });
    });

    this.setOfCheckedId.clear();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
    this.actionEvent.emit({ action: 'onAllChecked', checked: value });
  }

  emitRequiredChange(id: number, propertyName: string, isChecked: boolean): void {
    this.actionEvent.emit({ action: 'switchChange', id: id, propertyName: propertyName, checked: isChecked });
  }

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  constructor(private modalService: NzModalService,private readonly userService:UserService, private notification: NzNotificationService, private router: Router) { 
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange($event: readonly any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
    console.log(this.indeterminate);
  }

  isSelected(id: number): boolean {
    return this.setOfCheckedId.has(id);
  }

  confirmDeleteSelected(): void {
    if (this.setOfCheckedId.size === 0) {
      this.notification.error('Error', 'Debe seleccionar al menos un elemento.');
      return;
    }

    this.modalService.confirm({
      nzTitle: '¿Estás seguro?',
      nzContent: 'Esta acción eliminará permanentemente los elementos seleccionados. ¿Estás seguro de que deseas continuar?',
      nzOkText: 'Sí',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.deleteSelected();
      },
      nzCancelText: 'No',
    });
  }
}
