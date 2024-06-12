import { Injectable, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class AkMessagesServiceService {
  constructor(private notificationService: NzNotificationService) {}

  success(message: string): void {
    this.notificationService.success('Correcto', message);
  }

  error(message: string): void {
    this.notificationService.error('Error', message);
  }

  errorPreventRepeat(message: string): void {
    this.notificationService.remove();
    this.error(message);
  }

  deleteConfirmation(template: TemplateRef<{}>): void {
    this.notificationService.remove();
    this.notificationService.template(template, { nzDuration: 0 });
  }
}
