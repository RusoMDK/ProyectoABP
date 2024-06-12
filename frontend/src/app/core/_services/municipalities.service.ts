import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MunicipalitiesService {
  constructor(private http: HttpClient) {}

  getMunicipalityByIdProvince(id) {
    return this.http.get(
      `${environment.apiUrl}core/municipality?province=${id}`,
    );
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}core/municipality?limit=1000`);
  }

  getById(id) {
    return this.http.get(`${environment.apiUrl}core/municipality/${id}/`);
  }
}
