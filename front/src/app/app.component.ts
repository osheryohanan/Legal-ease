import { Component } from '@angular/core';
import {  UserService} from "./services/api/user.service";
import { AnthService } from './services/api/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authservice:AnthService,public translate: TranslateService) {
    translate.addLangs(['en', 'he']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|he/) ? browserLang : 'en');
}
  ngOnInit(): void {


  }
  title = 'lease-ease';
}
