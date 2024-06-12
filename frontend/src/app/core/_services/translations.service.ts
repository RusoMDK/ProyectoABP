import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  constructor(
    private http: HttpClient,
    public translate: TranslateService,
  ) {}

  getProfileLanguage(): string {
    return 'es';
  }

  getSystemLanguages(): string[] {
    return ['es', 'en'];
  }
}
