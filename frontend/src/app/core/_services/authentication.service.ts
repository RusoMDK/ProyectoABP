import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from '../../../environments/environment';
import { PermissionsService } from '../_services/permissions.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Tokens } from '../_models/tokens';
import { LoginCredentials } from '../_models/login-credentials';
import { RegisterData } from '../_models/register-data';

interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | null = null;
  private refreshTokenTimeout: number | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private permissions: PermissionsService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('userData') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: RegisterData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    console.log('Llamando al endpoint de login con datos:', credentials);
    return this.http.post<LoginResponse>(`${environment.loginUrl}`, credentials).pipe(
      tap(response => {
        console.log('Respuesta del login:', response);
        const tokens: Tokens = {
          access: response.token,
          refresh: '' // Si no hay refresh token, puedes dejarlo vacío
        };
        this.doLoginUser(response.user.username, tokens);
        this.startRefreshTokenTimer();
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.doLogoutUser();
    this.stopRefreshTokenTimer();
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken(): Observable<Tokens> {
    return this.http.post<Tokens>(`${environment.apiUrl}/auth/refresh`, {
      refresh: this.getRefreshToken(),
    }).pipe(
      tap((tokens: Tokens) => {
        console.log('refresh token');
        this.startRefreshTokenTimer();
        this.storeJwtToken(tokens.access);
      }),
      catchError(this.handleError)
    );
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);

    const user_data = jwt_decode(jwt) as User;
    localStorage.setItem('userData', JSON.stringify(user_data));
    this.currentUserSubject.next(user_data);

    const modules = user_data.modules ? this.parsePermissions(user_data.modules) : [];
    const permissions = user_data.permissions ? this.parsePermissions(user_data.permissions) : [];
    
    this.permissions.setPermissions(
      modules.concat(permissions)
    );
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);

    const user_data = jwt_decode(tokens.access) as User;
    localStorage.setItem('userData', JSON.stringify(user_data));

    this.currentUserSubject.next(user_data);

    const modules = user_data.modules ? this.parsePermissions(user_data.modules) : [];
    const permissions = user_data.permissions ? this.parsePermissions(user_data.permissions) : [];

    this.permissions.setPermissions(
      modules.concat(permissions)
    );
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);

    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);

    this.permissions.flushPermissions();
  }

  private startRefreshTokenTimer(): void {
    const jwtToken = JSON.parse(atob(this.getJwtToken()!.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    ) as unknown as number;
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor, inténtelo de nuevo más tarde.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parsePermissions(data: string): any[] {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing permissions:', error);
      return [];
    }
  }
}
