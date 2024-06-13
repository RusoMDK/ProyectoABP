import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
    {
      path: '',
      loadChildren: () =>
        import('./routing/base-routing.module').then((m) => m.BaseRoutingModule),
      // canActivate: [AuthGuard],
    },
    // {
      //   path: '403',
  //   component: E403Component,
  // },
  // {
  //   path: '**',
  //   component: E404Component,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
