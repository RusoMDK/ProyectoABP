/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataS } from '../Components/interface/data.interface';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data-sensor';

  constructor(private http: HttpClient) {}

  get(): Observable<DataS[]> {
    return this.http.get<DataS[]>(`${this.apiUrl}`);
  }
  create(dataCreate:DataS): Observable<DataS> {
    return this.http.post<DataS>(`${this.apiUrl}`, dataCreate);
  }
  update(id:number,updateDataDto:DataS): Observable<DataS> {
    return this.http.patch<DataS>(`${this.apiUrl}/${id}`, updateDataDto);
  }

  delete(id:number): Observable<DataS> {
    return this.http.delete<DataS>(`${this.apiUrl}/${id}`);
  }
  subscribeToTopic(): Observable<string> {
    return this.http.get<string>(`http://localhost:3000/mqtt/subscribe`);
  }

  getAllStoredData(): Observable<DataS[]> {
    return this.http.get<DataS[]>(`${this.apiUrl}/all`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al obtener datos:', error);
    return throwError('Ocurrió un error al obtener los datos; por favor, inténtelo de nuevo más tarde.');
  }
}