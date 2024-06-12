import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './ngZorro/icons-provider.module';
import es from '@angular/common/locales/es';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { SearchComponent } from './utils/components/search/search.component';
// import { ProvinciaMunicipioComponent } from './utils/components/forms/provincia-municipio/provincia-municipio.component';
// import { E404Component } from './utils/components/error-page/e404/e404.component';
// import { E403Component } from './utils/components/error-page/e403/e403.component';
// import { E500Component } from './utils/components/error-page/e500/e500.component';
// import { InputComponent } from './utils/components/forms/input/input.component';
// import { DateComponent } from './utils/components/forms/date/date.component';
// import { InputNumberComponent } from './utils/components/forms/input-number/input-number.component';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { SelectComponent } from './utils/components/forms/select/select.component';
// import { CheckboxComponent } from './utils/components/forms/checkbox/checkbox.component';
import { ColorPickerModule } from 'ngx-color-picker';
// import { ColorPickerComponent } from './utils/components/forms/color-picker/color-picker.component';
// import { TextAreaComponent } from './utils/components/forms/text-area/text-area.component';
// import { ActiveComponent, StateComponent } from './utils/components/active/active.component';
// import { SelectMultipleComponent } from './utils/components/forms/select-multiple/select-multiple.component';
// import { HeadFormComponent } from './utils/components/head-form/head-form.component';
// import { AkModalDetailsComponent } from './utils/components/ak-modal-details/ak-modal-details.component';
// import { MapFormComponent } from './utils/components/forms/map-form/map-form.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { DisableButtonComponent } from '../core/utils/components/lists/disable_button.component';
// import { DeleteButtonComponent } from './utils/components/lists/delete-button.component';
// import { FooterTableComponent } from './utils/components/footer-table/footer-table.component';
// import { SelectTwoComponent } from './utils/components/forms/select-two/select-two.component';
// import { PersonAvatarComponent } from './utils/components/forms/person-avatar/person-avatar.component';
// import { TransferComponent } from './utils/components/forms/transfer/transfer.component';
// import { AlertComponent } from './utils/components/alert/alert.component';
// import { DashboardDynamicComponent } from './utils/components/dashboard-dynamic/dashboard-dynamic.component';
// import { SelectInputComponent } from './utils/components/forms/select-input/select-input.component';
// import { SelectAssociateComponent } from './utils/components/forms/select-associate/select-associate.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MinioPipe } from './_pipes/minio.pipe';
// import { TabComponent } from './utils/components/tab/tab.component';
import { TypeofPipe } from './_pipes/typeof.pipe';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { IconModule } from '@ant-design/icons-angular';
import { NgxMaskModule } from './ngx-mask.module';

registerLocaleData(es);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    // ActiveComponent,
    // AkModalDetailsComponent,
    // AlertComponent,
    // CheckboxComponent,
    // ColorPickerComponent,
    // DateComponent,
    // DeleteButtonComponent,
    // DisableButtonComponent,
    // E403Component,
    // E404Component,
    // E500Component,
    // FooterTableComponent,
    // HeadFormComponent,
    // InputComponent,
    // InputNumberComponent,
    // MapFormComponent,
    // PersonAvatarComponent,
    // ProvinciaMunicipioComponent,
    // SearchComponent,
    // SelectAssociateComponent,
    // SelectComponent,
    // SelectMultipleComponent,
    // SelectTwoComponent,
    // StateComponent,
    // TextAreaComponent,
    // TransferComponent,
    // AlertComponent,
    // DashboardDynamicComponent,
    // SelectInputComponent,
    // SelectAssociateComponent,
    // MinioPipe,
    // TabComponent,
    TypeofPipe,
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    CoreRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    IconModule,
    IconsProviderModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
    NgxChartsModule,
    NgxPermissionsModule.forRoot(),
    NgZorroAntdModule,
    ReactiveFormsModule,
    NgxMaskModule,
    TranslateModule.forRoot({
      // defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    // ActiveComponent,
    // AkModalDetailsComponent,
    // AlertComponent,
    // CheckboxComponent,
    // ColorPickerComponent,
    ColorPickerModule,
    // DateComponent,
    // DeleteButtonComponent,
    // DisableButtonComponent,
    DragDropModule,
    // E403Component,
    // E404Component,
    // E500Component,
    // FooterTableComponent,
    FormsModule,
    // HeadFormComponent,
    HttpClientModule,
    IconsProviderModule,
    // InputComponent,
    // InputNumberComponent,
    // MapFormComponent,
    NgxSpinnerModule,
    NgxChartsModule,
    NgxPermissionsModule,
    NgZorroAntdModule,
    // PersonAvatarComponent,
    // ProvinciaMunicipioComponent,
    ReactiveFormsModule,
    // SearchComponent,
    // SelectAssociateComponent,
    // SelectComponent,
    // SelectMultipleComponent,
    // SelectTwoComponent,
    // StateComponent,
    // TextAreaComponent,
    // TransferComponent,
    TranslateModule,
    // DashboardDynamicComponent,
    // SelectInputComponent,
    // MinioPipe,
    TypeofPipe,
    // TabComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
})
export class CoreModule {}
