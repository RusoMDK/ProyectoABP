/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.css']
})
export class DatePickerModalComponent {
  selectedDate: string = '';

  @Output() dateSelected = new EventEmitter<string>();

  applyDate() {
    console.log('Emitiendo fecha:', this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
    ($('#datePickerModal') as any).modal('hide');
  }
}
