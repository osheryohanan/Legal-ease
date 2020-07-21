import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UserActivateService } from '../services/guards/authentified.guard';
import { LawyersListComponent } from './pages/lawyers-list/lawyers-list.component';
import { LawyerComponent } from './pages/lawyer/lawyer.component';
import { MymeetingComponent } from './pages/mymeeting/mymeeting.component';



const routes: Routes = [
  { path: '', component: IndexComponent,/*canActivate:[UserActivateService]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'search', component: SearchComponent ,canActivate:[UserActivateService] },
  { path: 'mymeeting', component: MymeetingComponent ,canActivate:[UserActivateService] },
  { path: 'lawyerList/:id', component: LawyersListComponent ,canActivate:[UserActivateService] },
  { path: 'lawyerinfo/:id', component: LawyerComponent ,canActivate:[UserActivateService] },
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
