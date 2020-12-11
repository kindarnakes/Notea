import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private google:GooglePlus,
    private authS:AuthService,private router:Router, private db:NotasService) { }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['/']);
    }
  }

  public async login(){
    try{
    let u=await this.authS.login();
    console.log(u)
    if(u.token!=-1){
      this.db.coleccion();
      this.authS.logPassed();
      this.router.navigate(['/']);
    }}catch(err){
      console.log(err);
    }
  }

}
