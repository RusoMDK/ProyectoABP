import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { AkMessagesServiceService } from '../utils/akMessagesService.service';
import { ApplicatioMessages } from '../utils/messages/applicationMessages';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  constructor(private message: AkMessagesServiceService) {}

  errors: any;
  errorsP: any[] = [];

  applicationMessages = ApplicatioMessages;

  setErrors(errors) {
    this.errors = errors;
  }

  getAll() {
    return this.errors;
  }

  getErrors(form, error) {
    console.log(this.errors);

    // form.get('name').setErrors({'incorrect': true});

    if (error === 'Unknown Error') {
      this.message.error(
        this.applicationMessages.systemMessages.errorAPiConnection,
      );
      return of(this.errorsP);
    } else {
      let cont = Object.keys(form.controls);
      this.errorsP = [];
      cont.forEach((e) => {
        if (this.errors[e]) {
          form.get(e).setErrors({ incorrect: true });
          if (this.errors[e] instanceof Array) {
            this.errors[e].forEach((ep) => {
              this.errorsP.push(ep);
            });
          } else {
            this.errorsP.push(this.errors[e]);
          }
        } else {
          form.get(e).setErrors(null);
        }
      });
      return of(this.errorsP);
    }
  }
}
