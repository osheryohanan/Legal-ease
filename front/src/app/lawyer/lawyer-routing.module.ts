import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';



const routes: Routes = [
  { path: '', component: DashboardComponent,/*canActivate:[UserActivateService]*/ },
  { path: 'profile', component: ProfileComponent,/*canActivate:[UserActivateService]*/ },
  { path: 'mymeetings', component: MeetingsComponent,/*canActivate:[UserActivateService]*/ },

]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
