import { Component } from '@angular/core';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { ConfirmPage } from '../pages/confirm/confirm.page';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../services/utilities.service';
import { LightService } from '../services/light.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listaNotas = [];
  firtsLoad: boolean = true;
  items_per_page:number = 10;
  page:number = 1;

  public searchF: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private notasS: NotasService,
     private vibration: Vibration,
    public aut: AuthService, public utils: UtilitiesService,
    private light:LightService) {

    this.searchF = this.formBuilder.group({
      title: ['', Validators.required]
    })
  }


  ngOnInit() {
    //this.notasS.coleccion();
  }

  ionViewDidEnter() {
    if (this.firtsLoad) {
      this.cargaDatos();
      this.aut.logPassed();
    }
    this.notasS.notas.forEach(nota => {
      this.listaNotas.push(nota);
    });
    this.notasS.notas = [];
  }


  public async cargaDatos($event = null) {
    this.aut.firtsLoad && await this.utils.presentLoading();
    try {
      this.page = 1;
      this.notasS.leeNotasPorPagina(this.items_per_page, this.page)
        .then((info) => {          
          //Ya ha llegado del servidor
          this.listaNotas = [];
          JSON.parse(info.data).forEach((doc) => {
            let nota = {
              id: doc.id,
              ...doc as Nota
            }
            this.listaNotas.push(nota);
          });
          //Ocultar el loading
          if (this.aut.firtsLoad) {
            this.utils.stopLoading();
            this.aut.firtsLoad = false;
          }

          if ($event) {
            $event.target.complete();
          }
        })
    } catch (err) {
      this.utils.stopLoading();
      //Error
    }
  }


  public borraNota(id: any) {
    this.vibration.vibrate(1000);
    this.utils.modal(ConfirmPage, {})
    .then((clear) => {
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

  public editaNota(nota: Nota) {
    let pos: number = this.listaNotas.indexOf(nota);

    this.utils.modal(EditNotaPage, {nota:nota}).then(data => {
      if (data.data) {
        this.listaNotas[pos] = data.data;
      }
    });
  }

  public search() {
    this.listaNotas = [];

    this.notasS.leeNotasPorTitulo(this.searchF.get('title').value).then((info) => {
      //Ya ha llegado del servidor
      this.listaNotas = [];
      JSON.parse(info.data).forEach((doc) => {
        let nota = {
          id: doc.id,
          ...doc as Nota
        }
        this.listaNotas.push(nota);
      })
    });
  }


  public async loadData(event) {
    this.page +=1; 
      await this.notasS.leeNotasPorPagina(this.items_per_page, this.page).then((data)=>{
        JSON.parse(data.data).forEach((doc) => {
          let nota = {
            id: doc.id,
            ...doc as Nota
          }
          this.listaNotas.push(nota);
        })
        event.target.complete();
      })


  }

}
