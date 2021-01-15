import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Nota } from 'src/app/model/nota';
import { AuthService } from 'src/app/services/auth.service';
import { NotasService } from 'src/app/services/notas.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MapPage } from '../map/map.page';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage implements OnInit {

  @Input('nota') nota: Nota;


  public tasks: FormGroup;
  public share: FormGroup;
  save: string;
  err_save: string;
  shareText: string;
  err_share: string;

  constructor(
    private formBuilder: FormBuilder,
    private notasS: NotasService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private modalController: ModalController,
    private utils:UtilitiesService,
    private translate:TranslateService,
    private auth: AuthService
  ) {
    this.tasks = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

    this.share = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  

  ionViewDidEnter() {
    this.tasks.get('title').setValue(this.nota.titulo);
    this.tasks.get('description').setValue(this.nota.contenido);
    this.translate.get('SAVE').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('ERR_SAVE').subscribe((res: string) => {
      this.err_save = res;
    });
    this.translate.get('SHARED').subscribe((res: string) => {
      this.shareText = res;
    });
    this.translate.get('ERR_SHARE').subscribe((res: string) => {
      this.err_share = res;
    });
  }

  public async sendForm():Promise<Nota> {
    await this.utils.presentLoading();

    let data: Nota = {
      id: this.nota.id,
      titulo: this.tasks.get('title').value,
      contenido: this.tasks.get('description').value,
      latitud: this.nota.latitud,
      longitud: this.nota.longitud,
      creador: this.nota.creador
    }
    this.notasS.actualizaNota(this.nota.id, data)
      .then((respuesta) => {
        this.loadingController.dismiss();
        this.utils.presentToast(this.save, "success");
        this.nota = data;
        this.modalController.dismiss(data);
      })
      .catch((err) => {
        this.loadingController.dismiss();
        this.utils.presentToast(this.err_save, "danger");
        console.log(err);
      })

      return this.nota;
  }

  public async toshare(){
    await this.utils.presentLoading();
    let email = this.share.get('email').value;
    this.notasS.agregaPermiso(this.nota.id, email).then((respuesta) => {
      console.log(respuesta);
      
      this.loadingController.dismiss();
      this.utils.presentToast(this.shareText, "success");
      this.share.setValue({
        email: ''
      });
      this.loadingController.dismiss();
      this.modalController.dismiss();
    })
    .catch((err) => {
      this.loadingController.dismiss();
      this.utils.presentToast(this.err_share, "danger");
      console.log(err);
    });
  }

  public map(nota:Nota) {
    this.utils.modal(MapPage, {nota:nota});
  }
}
