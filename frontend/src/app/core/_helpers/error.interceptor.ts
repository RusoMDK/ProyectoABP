import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { FormErrorService } from '../_services/form-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private errosForm: FormErrorService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          [401, 403].includes(err.status) &&
          this.authenticationService.isLoggedIn()
        ) {
          // auto logout if 401 or 403 response returned from api
          this.authenticationService.logout();
        }

        if ([400].includes(err.status)) {
          this.errosForm.setErrors(err.error);
        }

        const error = err?.error?.message || err.statusText;
        return throwError(() => new Error(error));
      }),
    );
  }
}
