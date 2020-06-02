
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteLayoutComponent} from "./website/layout/website-layout.component";
import { LawyerLayoutComponent } from './lawyer/layout/lawyer-layout.component';


const routes: Routes = [
  {
    path: '',
    component:WebsiteLayoutComponent,
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'lawyer',
    component:LawyerLayoutComponent,
    loadChildren: () => import('./lawyer/lawyer.module').then(m => m.LawyerModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
