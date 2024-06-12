import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Manager {
  constructor(
    protected endpoint: string,
    protected http: HttpClient,
  ) {}

  getByFilter = (
    limit: number | null = null,
    offset: number | null = null,
    search = '',
    ordering = 'is_disable, name',
    filters = '',
  ): Observable<any> => {
    return this.http.get(
      `${this.endpoint}?limit=${limit}&offset=${offset}&search=${search}&ordering=${ordering}${filters}`,
    );
  };

  getById = (id: string): Observable<any> => {
    return this.http.get(`${this.endpoint}${id}/`);
  };

  get = (
    limit: number | null = null,
    offset: number | null = null,
    search = '',
    ordering = 'is_disable, name',
    filters = '',
  ): Observable<unknown> => {
    return this.http.get(
      `${this.endpoint}?limit=${limit}&offset=${offset}&search=${search}&ordering=${ordering}${filters}`,
    );
  };

  create = (body: any): Observable<any> => {
    return this.http.post(`${this.endpoint}`, body);
  };

  update = (id: string, body: any): Observable<any> => {
    return this.http.put(`${this.endpoint}${id}/`, body);
  };

  patch = (id: string, body: any): Observable<any> => {
    return this.http.patch(`${this.endpoint}${id}/`, body);
  };

  delete = (id: string): Observable<any> => {
    return this.http.delete(`${this.endpoint}${id}/`);
  };
}

export interface Response {
  count: 0;
  next: null;
  previous: null;
  results: [];
}
