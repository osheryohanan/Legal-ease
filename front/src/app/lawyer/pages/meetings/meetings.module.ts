import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './meetings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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


@NgModule({
  declarations: [MeetingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MeetingsRoutes),
    ModalModule.forRoot()
  ]
})
export class MeetingsModule { }
