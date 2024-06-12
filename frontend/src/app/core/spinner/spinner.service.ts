import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// This service serves as interface for the spinner.

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  constructor(private loadingSpinner: NgxSpinnerService) {}

  hide() {
    this.loadingSpinner.hide();
  }

  show() {
    this.loadingSpinner.show();
  }
}
