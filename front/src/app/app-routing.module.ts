import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteLayoutComponent} from "./website/layout/website-layout.component";


const routes: Routes = [
  {
    path: '',
    component:WebsiteLayoutComponent,
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
