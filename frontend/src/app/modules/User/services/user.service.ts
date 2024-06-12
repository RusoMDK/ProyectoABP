import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCreate, UserUpdate } from '../Components/interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  getOne(id:number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  create(deviceCreate:UserCreate): Observable<UserCreate> {
    return this.http.post<UserCreate>(`${this.apiUrl}`, deviceCreate);
  }
  update(id:number,updateSensorDto:UserUpdate): Observable<UserUpdate> {
    return this.http.patch<UserUpdate>(`${this.apiUrl}/${id}`, updateSensorDto);
  }

  delete(id:number): Observable<User> {
    console.log(id)
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
}