import { NgModule, LOCALE_ID } from '@angular/core';

import { environment } from '../environments/environment';

//Store
import { _user_reducer, LoginEffects } from './stores/user/user.store';


//Component
import { WebsiteLayoutComponent} from "./website/layout/website-layout.component";
import { LawyerLayoutComponent } from './lawyer/layout/lawyer-layout.component';
import { AppComponent } from './app.component';

//Module
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./website/shared/shared.module";
import { Helper } from './services/guards/authentified.guard';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './services/api/user.service';
import { ApiHttpService } from './services/api/base.services';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnthService } from './services/api/common.service';
import { LawyerService } from './services/api/lawyer.service';
import { ComponentsModule } from "./lawyer/components/components.module";
import { ToastrModule } from "ngx-toastr";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';

export class DynamicLocaleId extends String {
  locale: string;

  toString() {
    return this.locale;
  }
}

//transtalte


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    WebsiteLayoutComponent,
    LawyerLayoutComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({user:_user_reducer}, {}),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ComponentsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],


      }
  })

  ],
  providers: [Helper,UserService,LawyerService,ApiHttpService,AnthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
