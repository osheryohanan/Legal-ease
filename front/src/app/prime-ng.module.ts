import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {CaptchaModule} from 'primeng/captcha';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  exports: [
    DialogModule,
    SidebarModule,
    MenubarModule,
    StepsModule,
    CheckboxModule,
    MultiSelectModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  imports: [
    ConfirmDialogModule,
    DialogModule,
    SidebarModule,
    MenubarModule,
    StepsModule,
    CheckboxModule,
    MultiSelectModule,
    ToastModule
  ],
  providers:[ConfirmationService]
})
export class PrimeNGModule { }
