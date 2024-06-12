import { NgModule } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [NgxMaskDirective, NgxMaskPipe],
  exports: [NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
})
export class NgxMaskModule {}
