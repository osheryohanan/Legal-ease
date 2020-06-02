import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LawyerRoutingModule } from './lawyer-routing.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [

    CommonModule,
    LawyerRoutingModule,


  ]
})
export class LawyerModule { }
