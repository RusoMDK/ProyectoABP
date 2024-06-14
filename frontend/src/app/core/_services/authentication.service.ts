import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RegisterData } from '../_models/register-data';
import { LoginCredentials } from '../_models/login-credentials';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('userData') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: RegisterData): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${environment.registerUrl}`, user).pipe(
      tap(response => this.storeJwtToken(response.accessToken)),
      catchError(this.handleError)
    );
  }

  login(credentials: LoginCredentials): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${environment.loginUrl}`, credentials).pipe(
      tap(response => this.storeJwtToken(response.accessToken)),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  private getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeJwtToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);

    const user_data = jwt_decode(token) as User;
    localStorage.setItem('userData', JSON.stringify(user_data));
    this.currentUserSubject.next(user_data);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor, inténtelo de nuevo más tarde.');
  }
}
