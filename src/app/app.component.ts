import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {Meta} from '@angular/platform-browser';
import {AppTitleService} from './app.title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public _appService: AppService,
              private metaTagService: Meta,
              private appTitle: AppTitleService) {

    /*** App Title */
    this.appTitle.init();

  }

  ngOnInit() {
    /*** Language Subscription **/
    this._appService.language.subscribe(language => {
      this._appService.currentLanguage = language === 'en' ? 'en' : 'ar';
      switch (language) {
        case ('en') :
          document.documentElement.setAttribute('lang', 'en');
          break;
        case ('ar') :
          document.documentElement.setAttribute('lang', 'ar');
          break;
      }
    });

    /*** Meta Tags **/
    this.metaTagService.addTags([
      {name: 'keywords', content: ''},
      {name: 'author', content: ''},
      {name: 'image', content: ''},
      {
        name: 'description',
        content: ''
      },
      {name: 'date', content: new Date().toString(), scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'}
    ]);
  }
}
