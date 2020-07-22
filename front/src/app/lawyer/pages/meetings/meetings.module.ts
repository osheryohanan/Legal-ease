import { TranslationModule } from './../../../moduleTranslation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './meetings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

export const MeetingsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: MeetingsComponent
      }
    ]
  }
];
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [MeetingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule.forRoot(),
    RouterModule.forChild(MeetingsRoutes),
    ModalModule.forRoot(),
    TranslationModule,


  ],providers:[
    MessageService,
    ConfirmationService

  ]
})
export class MeetingsModule { }
