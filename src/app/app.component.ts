import { AfterViewInit, Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import { LightService } from './services/light.service';
import { NotasService } from './services/notas.service';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS: AuthService,
    private translate: TranslateService,
    private tranS: TranslationService,
    private light: LightService,
    private notaS: NotasService,
    private notifications:NotificationsService

  ) {
    this.splashScreen.show();
    this.initializeApp();
    this.notaS.coleccion();
  }
  ngAfterViewInit(): void {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.authS.init();
      this.splashScreen.hide();

      this.light.enableCheckDarkMode();
      this.notifications.initNotifications();


      this.translate.addLangs(this.tranS.languages);  //add all languages
      this.translate.setDefaultLang('en'); //use default language
      this.tranS.language = 'en';
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (this.tranS.languages.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
          this.tranS.language = this.translate.getBrowserLang();
        }
      }
    });
  }

}
