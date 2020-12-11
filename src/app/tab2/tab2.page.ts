import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks:FormGroup;


  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  constructor(
    private formBuilder:FormBuilder,
    private notasS:NotasService,
    public loadingController: LoadingController,
    public toastController: ToastController, private geolocation: Geolocation
  ) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    })
  }

  ionViewDidEnter(){
  }

  public async sendForm(){
    await this.presentLoading();
    await this.getCurrentCoordinates();
    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
      coordenadas:{
        lat: this.latitude,
        lon: this.longitude
      }
    }
    this.notasS.agregaNota(data)
    .then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:''
      })
      this.loadingController.dismiss();
      this.presentToast("Nota guardada","success");
      this.notasS.notas.push(data);
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
      console.log(err);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner:'crescent'
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color:col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }

  async getCurrentCoordinates() {
    let options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
    };
    await this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
