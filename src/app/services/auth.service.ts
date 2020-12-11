import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Nota } from '../model/nota';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public user = {
    token: -1,
    name: '',
    avatar: '',
    email: ''
  }



  public log:boolean = true;

  constructor(private storage: NativeStorage,
    private google: GooglePlus,
    private router: Router) {
  }

  async init() {
    let u = null;
    try {
      u = await this.storage.getItem("user");;
    } catch (err) {
      console.log(err);
      
      u = null;
    }
    if (u != null) {
      this.user = u;
      console.log(this.user.name);
      
    }
  }

  public isLogged(): boolean {
    if (this.user.token == -1) {
      return false;
    } else {
      return true;
    }
  }
  public async logout() {
    try {
      const options = {
        offline: false
      };
      await this.google.trySilentLogin(options)
      await this.google.logout();
    } catch (err) {
      console.log(err);
    }

    this.user = {
      token: -1,
      name: '',
      avatar: '',
      email: ''
    }
    await this.storage.setItem("user", this.user);
  }

  public async login() {
    try {
      let u = await this.google.login({})
      console.log(u)
      if (u) {
        console.log("--------->"+u['email'])
        this.user = {
          token: u['accessToken'],
          name: u['displayName'],
          avatar: u['imageUrl'],
          email: u['email']
        }
      }
    } catch (err) {
      this.user = {
        token: -1,
        name: '',
        avatar: '',
        email:''
      }
      console.log(err);
    }
    await this.storage.setItem("user", this.user);
    return this.user;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isLogged()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  public logPassed(){
    this.log = !this.log;
  }
}
