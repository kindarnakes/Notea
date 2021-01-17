import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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

  public push_key = '';

  public url = 'http://notea.ddns.net:3000/';
  public apiKey = 'Franciscodelosrios.es';




  public log:boolean = true;
  public firtsLoad: boolean;

  constructor(private storage: NativeStorage,
    private google: GooglePlus,
    private router: Router, private http:HTTP) {
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
      //console.log(this.user.name);
      
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

      this.user = {
        token: -1,
        name: '',
        avatar: '',
        email: ''
      }
      await this.storage.setItem("user", this.user);
      this.firtsLoad = true;
    } catch (err) {
      console.log(err);
    }
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
        this.http.post(this.url+'user/add', {email:this.user.email, push_key:this.push_key}, {apiKey:this.apiKey});
        this.firtsLoad = true;
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
