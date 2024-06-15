import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      console.log('Acceso permitido para el usuario:', currentUser);
      return true;
    }

    // No autenticado, redirigir al login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
