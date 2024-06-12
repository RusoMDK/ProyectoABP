import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AkModalDetailsComponent } from './components/ak-modal-details/ak-modal-details.component';

@Injectable({
  providedIn: 'root',
})
export class AkModalServiceService {
  constructor(private modalService: NzModalService) {}

  modalSmall = '40%';
  modalMedium = '55%';
  modalLarge = '65%';
  modalExtraLarge = '90%';

  create(params: any) {
    this.modalService.create({
      nzClosable: false,
      nzWidth: params.nzWidth ? params.nzWidth : this.modalSmall,
      nzContent: AkModalDetailsComponent,
      nzNoAnimation: true,
      nzComponentParams: {
        title: params.nzComponentParams.title
          ? params.nzComponentParams.title
          : '',
        columns: params.nzComponentParams.columns
          ? params.nzComponentParams.columns
          : '1',
        data: params.nzComponentParams.data
          ? params.nzComponentParams.data
          : null,
      },
    });
  }
}
