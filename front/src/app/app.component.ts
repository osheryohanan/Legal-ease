import { Component, Renderer2 } from '@angular/core';
import { AnthService } from './services/api/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authservice: AnthService, public translate: TranslateService, private renderer: Renderer2) {
    translate.addLangs(['en', 'he']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    console.log(browserLang);

    translate.use(browserLang.match(/en|he/) ? browserLang : 'en');

  }
  ngOnInit(): void {


  }
  title = 'lease-ease';
}
