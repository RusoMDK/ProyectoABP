import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from '../../routing/base-routing.module';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './base.component';
import { CoreModule } from '../../core/core.module';
import { HeaderComponent } from './header/header.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { IndexViewComponent } from 'src/app/layouts/index-view/index-view.component';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { LogRecoveryComponent } from 'src/app/Auth/recovery/log-recovery.component';
import { RegisterComponent } from '../../Auth/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    BaseComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    MenuLeftComponent,
    IndexViewComponent,
    LoginComponent,
    LogRecoveryComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule, 
    BaseRoutingModule, 
    CoreModule
  ],
  
  providers: [],
  exports: [
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    MenuLeftComponent,
    IndexViewComponent,
    LoginComponent,
    LogRecoveryComponent,
    RegisterComponent, 
  ],
})
export class BaseModule {}
