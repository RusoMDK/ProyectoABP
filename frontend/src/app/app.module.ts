import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BaseModule } from './routing/base.module';
import { DeviceModule } from './modules/Device/device.module';
import { DataModule } from './modules/Data/data.module';
import { SensorModule } from './modules/Sensor/sensor.module';
import { ChartsModule } from './modules/Charts/charts.module';
import { EscenaryModule } from './modules/Escenary/escenary.module';
import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import { UserModule } from './modules/User/user.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    BaseModule,
    DeviceModule,
    DataModule,
    SensorModule,
    ChartsModule,
    EscenaryModule,
    UserModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
