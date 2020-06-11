import { environment } from './../../environments/environment.prod';
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
import { PrimeNGModule } from '../prime-ng.module';
import { SearchComponent } from './search/search.component';
import { Title } from '@angular/platform-browser';
import { SocialLoginModule, AuthServiceConfig,GoogleLoginProvider } from "angularx-social-login";
import { LawyersListComponent } from './pages/lawyers-list/lawyers-list.component';

export function provideConfig() {
  return  new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.GID)
    },
    // {
    //   id: FacebookLoginProvider.PROVIDER_ID,
    //   provider: new FacebookLoginProvider("Facebook-App-Id")
    // }
  ]);;
}


@NgModule({
  declarations: [ LoginComponent, RegisterComponent, IndexComponent, SearchComponent, LawyersListComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PrimeNGModule,
    SocialLoginModule

  ],
   providers: [
  Title,
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }
]
})
export class WebsiteModule { }
