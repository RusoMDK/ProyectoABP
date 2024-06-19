import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BaseModule } from './layouts/base/base.module';
import { DeviceModule } from './modules/Device/device.module';
import { DataModule } from './modules/Data/data.module';
import { SensorModule } from './modules/Sensor/sensor.module';
import { ChartsModule } from './modules/Charts/charts.module';
import { EscenaryModule } from './modules/Escenary/escenary.module';
import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import { UserModule } from './modules/User/user.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardOutline, UserOutline, BarChartOutline, ExperimentOutline, MobileOutline, EnvironmentOutline, DatabaseOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(en);

const icons = [DashboardOutline, UserOutline, BarChartOutline, ExperimentOutline, MobileOutline, EnvironmentOutline, DatabaseOutline];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,  // Añadido para los formularios reactivos
    HttpClientModule,
    CoreModule,
    BaseModule,
    DeviceModule,
    DataModule,
    SensorModule,
    ChartsModule,
    EscenaryModule,
    UserModule,
    NzIconModule.forRoot(icons), // Importar NzIconModule y los íconos necesarios
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
