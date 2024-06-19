import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Sensor, SensorCreate, SensorUpdate } from '../Components/interface/sensor.interface';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/sensors';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {}

  get(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrl}`);
  }

  getByUser(): Observable<Sensor[]>{
    const user = this.authService.currentUserValue
    if(user){
      return this.http.get<Sensor[]>(`${this.apiUrl}/by-user?userId=${user.sub}`);
    }
    return this.http.get<Sensor[]>(`${this.apiUrl}/by-user?id=${1}`);
  }

  getOne(id:number): Observable<Sensor> {
    return this.http.get<Sensor>(`${this.apiUrl}/${id}`);
  }

  create(deviceCreate:SensorCreate): Observable<SensorCreate> {
    return this.http.post<SensorCreate>(`${this.apiUrl}`, deviceCreate);
  }

  update(id:number,updateSensorDto:SensorUpdate): Observable<SensorUpdate> {
    return this.http.patch<SensorUpdate>(`${this.apiUrl}/${id}`, updateSensorDto);
  }

  delete(id:number): Observable<Sensor> {
    return this.http.delete<Sensor>(`${this.apiUrl}/${id}`);
  }
}