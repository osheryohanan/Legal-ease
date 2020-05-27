import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../services/api/user.service';
import { ApiHttpService } from '../services/api/base.services';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';






@NgModule({
  declarations: [ LoginComponent, RegisterComponent, IndexComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule

  ],providers:[]
})
export class WebsiteModule { }
