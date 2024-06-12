import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { STRUCTURES_ENDPOINTS } from '../../modules/structure/structure.endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  constructor(private http: HttpClient) {}

  getProvinces() {
    return this.http.get(`${environment.apiUrl}core/province/?ordering=+name`);
  }

  getProvincesOrderCode() {
    return this.http.get(`${environment.apiUrl}core/province/?&ordering=code`);
  }

  getById(id) {
    return this.http.get(`${environment.apiUrl}core/province/${id}/`);
  }
}
