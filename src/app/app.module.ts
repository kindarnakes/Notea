import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotasService } from './services/notas.service';
import { EditNotaPage } from './pages/edit-nota/edit-nota.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './services/auth.service';
import { ConfirmPage } from './pages/confirm/confirm.page';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { MapPage } from './pages/map/map.page';
import { HTTP } from '@ionic-native/http/ngx';
import { UtilitiesService } from './services/utilities.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GeolocationService } from './services/geolocation.service';
import { TranslationService } from './services/translation.service';
import { Sensors } from '@ionic-native/sensors/ngx';
import { LightService } from './services/light.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationsService } from './services/notifications.service';

export function setTranslateLoader(http: any) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,EditNotaPage, ConfirmPage, MapPage],
  entryComponents: [EditNotaPage, ConfirmPage, MapPage],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: (setTranslateLoader), 
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NotasService,
    NativeStorage,
    GooglePlus,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Vibration,
    NativeGeocoder,
    Geolocation,
    HTTP,
    UtilitiesService,
    GeolocationService,
    TranslationService,
    Sensors,
    LightService,
    FCM,
    LocalNotifications,
    NotificationsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
