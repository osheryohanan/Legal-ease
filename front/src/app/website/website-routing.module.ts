import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './search/search.component';
import { UserActivateService } from '../services/guards/authentified.guard';



const routes: Routes = [
  { path: '', component: IndexComponent,/*canActivate:[UserActivateService]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'search', component: SearchComponent ,canActivate:[UserActivateService] },
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
