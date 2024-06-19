import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Output() dateSelected = new EventEmitter<string>();
  formattedDate: string | null = null;

  onDateSelected(date: string) {
    console.log('Fecha recibida en breadcrumb:', date);
    this.dateSelected.emit(date);
    this.formattedDate = date;
  }

  // formatDate(date: string): string {
  //   const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  //   return new Date(date).toLocaleDateString('es-ES', options);
  // }
}
