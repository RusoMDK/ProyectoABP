import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devices, DevicesCreate, DevicesUpdate } from '../Components/interface/device.interface';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/device';

  constructor(private http: HttpClient) {}

  get(): Observable<Devices[]> {
    return this.http.get<Devices[]>(`${this.apiUrl}`);
  }
  getOne(id:number): Observable<Devices> {
    return this.http.get<Devices>(`${this.apiUrl}/${id}`);
  }
  create(deviceCreate:DevicesCreate): Observable<DevicesCreate> {
    return this.http.post<DevicesCreate>(`${this.apiUrl}`, deviceCreate);
  }
  update(id:number,updateDeviceDto:DevicesUpdate): Observable<DevicesUpdate> {
    return this.http.patch<DevicesUpdate>(`${this.apiUrl}/${id}`, updateDeviceDto);
  }

  delete(id:number): Observable<Devices> {
    console.log('aqui llega el id',id)
    return this.http.delete<Devices>(`${this.apiUrl}/${id}`);
  }
}