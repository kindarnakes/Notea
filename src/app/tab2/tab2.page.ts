import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../services/auth.service';
import { UtilitiesService } from '../services/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: FormGroup;


  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  save: string = '';
  err_save: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private notasS: NotasService,
    public utils: UtilitiesService, private geolocation: Geolocation,
    private authS: AuthService,
    public translate: TranslateService,
    private geo: GeolocationService
  ) {
    this.tasks = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ionViewDidEnter() {
    this.translate.get('SAVE').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('ERR_SAVE').subscribe((res: string) => {
      this.err_save = res;
    });
  }

  public async sendForm() {
    await this.utils.presentLoading();
    await this.getCurrentCoordinates();

    let data: Nota = {
      titulo: this.tasks.get('title').value,
      contenido: this.tasks.get('description').value,
      latitud: this.latitude,
      longitud: this.longitude,
      creador: this.authS.user.email
    }
    this.notasS.agregaNota(data)
      .then((respuesta) => {


        this.utils.stopLoading();
        this.utils.presentToast(this.save, "success");
        data.id = JSON.parse(respuesta.data).insertId;
        this.notasS.notas.push(data);
        this.tasks.setValue({
          title: '',
          description: ''
        })
      })
      .catch((err) => {
        this.utils.stopLoading();
        this.utils.presentToast(this.err_save, "danger");
        console.log(err);
      })
  }



  async getCurrentCoordinates() {

    await this.geo.getCurrentCoordinates().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
