import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from '../layouts/base/base.component';
import { WelcomeComponent } from '../layouts/base/welcome/welcome.component';
import { AuthGuard } from '../core/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'devices',
        loadChildren: () =>
          import('../modules/Device/device-routing.module').then(
            (m) => m.DeviceRoutingModule,
          ),
      },
      {
        path: 'sensors',
        loadChildren: () =>
          import('../modules/Sensor/sensor-routing.module').then(
            (m) => m.SensorRoutingModule,
          ),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('../modules/Charts/charts-routing.module').then(
            (m) => m.ChartsRoutingModule,
          ),
      },
      {
        path: 'escenary',
        loadChildren: () =>
          import('../modules/Escenary/escenary-routing.module').then(
            (m) => m.EscenaryRoutingModule,
          ),
      },
      {
        path: 'data',
        loadChildren: () =>
          import('../modules/Data/data-routing.module').then(
            (m) => m.DataRoutingModule,
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../modules/User/user-routing.module').then(
            (m) => m.UserRoutingModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
