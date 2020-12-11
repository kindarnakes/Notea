import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { ConfirmPage } from '../pages/confirm/confirm.page';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listaNotas = [];
  firtsLoad: boolean = true;

  public searchF: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private notasS: NotasService,
    private modalController: ModalController, private vibration: Vibration,
    public loadingController: LoadingController, public aut: AuthService) {

    this.searchF = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }


  ngOnInit() {
    this.cargaDatos();
    this.firtsLoad = false;
  }

  ionViewDidEnter() {
    if (this.aut.log) {
      this.cargaDatos();
      this.aut.logPassed();
    }
    this.notasS.notas.forEach(nota => {
      this.listaNotas.push(nota);
    });
    this.notasS.notas = [];
  }


  public cargaDatos($event = null) {
    this.firtsLoad && this.presentLoading();
    try {
      this.notasS.leeNotas()
        .subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas = [];
          info.forEach((doc) => {
            let nota = {
              id: doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
          });
          //Ocultar el loading
          console.log(this.listaNotas);
          this.loadingController.dismiss();
          if ($event) {
            $event.target.complete();
          }
        })
    } catch (err) {
      this.loadingController.dismiss();
      //Error
    }
  }
  public async borraNota(id: any) {
    this.vibration.vibrate(1000);
    const modal = await this.modalController.create({
      component: ConfirmPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();

    await modal.onDidDismiss().then((clear) => {
      if (clear.data == true) {
        this.notasS.borraNota(id)
          .then(() => {
            let tmp = [];
            this.listaNotas.forEach((nota) => {
              if (nota.id != id) {
                tmp.push(nota);
              }
            })
            this.listaNotas = tmp;
          })
          .catch(err => {

          })
      }
    })
  }

  public async editaNota(nota: Nota) {
    let pos: number = this.listaNotas.indexOf(nota);
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });


    await modal.present();

    await modal.onDidDismiss().then((data) => {
      if (data.data['titulo'] != null) {
        console.log(data.data);
        this.listaNotas[pos] = {
          id: nota.id,
          ...data.data as Nota
        };
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: 'crescent'
    });
    await loading.present();
  }

  public search() {
    this.listaNotas = [];

    this.notasS.leeNotasPorTitulo(this.searchF.get('title').value).get().then((info) => {
      //Ya ha llegado del servidor
      this.listaNotas = [];
      info.forEach((doc) => {
        let nota = {
          id: doc.id,
          ...doc.data()
        }
        this.listaNotas.push(nota);
      })
    });
  }

}
