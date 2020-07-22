import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { AvailabilityComponent } from './pages/availability/availability.component';
import { UserActivateService } from '../services/guards/authentified.guard';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate:[UserActivateService]},
  { path: 'profile', component: ProfileComponent,canActivate:[UserActivateService] },

  { path: 'availability', component: AvailabilityComponent,canActivate:[UserActivateService]},
  {
    path: "mymeetings",
    loadChildren: () => import('./pages/meetings/meetings.module').then(m => m.MeetingsModule)
  },

]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
