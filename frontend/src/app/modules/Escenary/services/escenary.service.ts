import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Escenary, EscenaryCreate, EscenaryUpdate} from '../Components/interface/escenary.interface';


@Injectable({
  providedIn: 'root'
})
export class EscenaryService {
  private apiUrl = 'http://localhost:3000/escenary';

  constructor(private http: HttpClient) {}

  get(): Observable<Escenary[]> {
    return this.http.get<Escenary[]>(`${this.apiUrl}`);
  }
  getOne(id:number): Observable<Escenary> {
    return this.http.get<Escenary>(`${this.apiUrl}/${id}`);
  }
  create(deviceCreate:EscenaryCreate): Observable<EscenaryCreate> {
    return this.http.post<EscenaryCreate>(`${this.apiUrl}`, deviceCreate);
  }
  update(id:number,updateSensorDto:EscenaryUpdate): Observable<EscenaryUpdate> {
    return this.http.patch<EscenaryUpdate>(`${this.apiUrl}/${id}`, updateSensorDto);
  }

  delete(id:number): Observable<Escenary> {
    return this.http.delete<Escenary>(`${this.apiUrl}/${id}`);
  }
}