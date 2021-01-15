import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public authS:AuthService, private router:Router, public tranS:TranslationService) {
  }

  ionViewDidEnter(){

  }

  public toogleMode(){
      document.body.classList.toggle('dark');
  }
  
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }

  public map(){
    this.router.navigate(['/map']);
  }

}
