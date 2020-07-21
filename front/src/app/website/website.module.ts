
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { PrimeNGModule } from '../prime-ng.module';
import { SearchComponent } from './pages/search/search.component';
import { Title } from '@angular/platform-browser';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { LawyersListComponent } from './pages/lawyers-list/lawyers-list.component';
import { LawyerComponent } from './pages/lawyer/lawyer.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';

import { ComponentsModule } from '../website/components/components.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MymeetingComponent } from './pages/mymeeting/mymeeting.component';
export function provideConfig() {
  return new AuthServiceConfig([
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

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [LoginComponent, RegisterComponent, IndexComponent, SearchComponent, LawyersListComponent, LawyerComponent, MymeetingComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    PrimeNGModule,
    SocialLoginModule,
    NgbModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],


      }
  })

  ],
  providers: [
    TranslateService,
    Title,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class WebsiteModule { }
