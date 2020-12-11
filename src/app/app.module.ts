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
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapPage } from './pages/map/map.page';

@NgModule({
  declarations: [AppComponent,EditNotaPage, ConfirmPage, MapPage],
  entryComponents: [EditNotaPage, ConfirmPage, MapPage],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule
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
    GoogleMaps

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
