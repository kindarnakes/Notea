import { Component, Input, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  constructor(
    private modalController:ModalController) { }

  ngOnInit() {
  }

  public async borraNota() {
        await this.modalController.dismiss(true);
  }

  public async noBorrar(){
    await this.modalController.dismiss(false);
  }

}
