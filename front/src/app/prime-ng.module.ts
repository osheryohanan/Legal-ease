import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {CaptchaModule} from 'primeng/captcha';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
@NgModule({
  exports: [
    DialogModule,
    SidebarModule,
    MenubarModule,
    StepsModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule
  ],
  imports: [
    ConfirmDialogModule,
    DialogModule,
    SidebarModule,
    MenubarModule,
    StepsModule,
    DropdownModule,
    ToastModule
  ],
  providers:[ConfirmationService]
})
export class PrimeNGModule { }
