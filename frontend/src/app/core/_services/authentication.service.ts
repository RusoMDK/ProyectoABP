import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from '../../../environments/environment';
import { PermissionsService } from '../_services/permissions.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Tokens } from '../_models/tokens';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | null = null;
  private refreshTokenTimeout: number | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private permissions: PermissionsService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('userData') as string),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${environment.loginUrl}`, { username, password })
      .pipe(
        tap((tokens) => {
          this.doLoginUser(username, tokens as unknown as Tokens);
          this.startRefreshTokenTimer();
        }),
        /*,
        mapTo(true),
        catchError(error => {
          return of(false);
        })*/
      );
  }

  logout() {
    this.doLogoutUser();
    this.stopRefreshTokenTimer();
    /*
    return this.http.post<any>(`${environment.loginUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => {
        this.doLogoutUser()
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));*/
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http
      .post<any>(`${environment.loginUrl}`, {
        refresh: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: Tokens) => {
          console.log('refresh token');
          // console.log('Antes de salvar el token')
          // console.log(tokens)
          this.startRefreshTokenTimer();
          this.storeJwtToken(tokens.access);
        }),
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) as string;
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  private getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);

    const user_data = jwt_decode.default(jwt) as any;
    localStorage.setItem('userData', JSON.stringify(user_data));
    this.currentUserSubject.next(user_data);

    // add user permissions
    this.permissions.setPermissions(
      JSON.parse(user_data.modules).concat(JSON.parse(user_data.permissions)),
    );

    // console.log('Nuevo token salvado')
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);

    const user_data = jwt_decode.default(tokens.access) as any;
    localStorage.setItem('userData', JSON.stringify(user_data));

    this.currentUserSubject.next(user_data);
    this.permissions.setPermissions(
      JSON.parse(user_data.modules).concat(JSON.parse(user_data.permissions)),
    );
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);

    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    this.currentUserSubject.next;

    // remove user permissions
    this.permissions.flushPermissions();
  }

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.getJwtToken().split('.')[1]));
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout,
    ) as unknown as number;
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* login2(username: string, password: string) {
     return this.http.post<any>(`${environment.loginUrl}api/token/`, {username, password}) //
       .pipe(map(user => {
         // console.log(user)
         // login successful if there's a jwt token in the response
         if (user && user.access) {
           // store user details and jwt token in local storage to keep user logged in between page refreshes
           sessionStorage.setItem('userToken', JSON.stringify(user));

           // var decoded = jwt_decode(user.access);
           // console.log("USER-ID: " + decoded['user_id']);
           let user_data = jwt_decode(user.access)
           sessionStorage.setItem('userData', JSON.stringify(user_data));
           // user.name = user_data.name
           // console.log(user_data)

           this.currentUserSubject.next(user);

           // add user permissions
           this.permissions.setPermissions();
         }

         return user;
       }));
   }*/

  /*refresh(req: HttpRequest<any>, next: HttpHandler) {
    const currentUser = this.authenticationService.currentUserValue;
    const refresh = currentUser.refresh;

    this.http.post<any>(`${environment.loginUrl}api/token/refresh/`, {refresh}) //
      .pipe(map(user => {
        // console.log(user)
        // login successful if there's a jwt token in the response
        if (user && user.access) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const userStore: User = JSON.parse(sessionStorage.getItem("userToken"));
          userStore.access = user.access;
          sessionStorage.setItem("userToken", JSON.stringify(userStore));
          // console.log(JSON.parse(sessionStorage.getItem("userToken"))["refresh"]);

          // console.log(userStore.access);

          this.currentUserSubject.next(userStore);

          // add user permissions
          this.permissions.setPermissions();

        }

        return user;
      }));
  }
*/
  /*logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userData');
    this.currentUserSubject.next(null);

    // remove user permissions
    this.permissions.flushPermissions();
  }*/
}
