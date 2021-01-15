import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  //private myCollection: AngularFirestoreCollection<any>;

  public notas: Nota[] = [];

  public url = 'http://notea.ddns.net:3000/';
  public apiKey = 'Franciscodelosrios.es';

  constructor(/*private fire: AngularFirestore,*/ private authS: AuthService, private http: HTTP) {
  }

  async coleccion() {
    //this.myCollection=this.fire.collection<any>(environment.notasCollection + " " + this.authS.user.email);

    await this.http.get(this.url + 'nota/0', {}, {})
      .then(data => {

        //console.log(data.status);
        //console.log(data.data); // data received by server
        //console.log(data.headers);

      })
      .catch(error => {
        if (error.status == null || error.status == -1) {
          this.url = 'http://192.168.0.21:3000/';
          this.authS.url = this.url;
        }

        //console.log(error.status);
        //console.log(error.error); // error message as string
        //console.log(error.headers);

      });
  }

  agregaNota(nuevaNota: Nota): Promise<any> {
    return this.http.post(this.url + 'nota', { ...nuevaNota, id_usuario: nuevaNota.creador, fecha: '0000-00-00' }, { apiKey: this.apiKey });
  }
  agregaPermiso(id: number, email: String) {
    return this.http.post(this.url + 'nota/permiso', { id_usuario: email, id_nota: id }, { apiKey: this.apiKey });
  }
  leeNotas(): Promise<HTTPResponse> {
    return this.http.get(this.url + 'notas/acceso', {}, { apiKey: this.apiKey, user: this.authS.user.email });
  }
  leeNota(id: any): Promise<HTTPResponse> {
    return this.http.get(this.url + 'nota/' + id, {}, { apiKey: this.apiKey });
  }
  actualizaNota(id: any, nuevaNota: Nota): Promise<HTTPResponse> {
    return this.http.put(this.url + 'nota/edit', { ...nuevaNota, id_usuario: nuevaNota.creador, fecha: '0000-00-00', id: id }, { apiKey: this.apiKey });
  }
  borraNota(id: any): Promise<HTTPResponse> {
    return this.http.delete(this.url + 'nota/' + id, {}, { apiKey: this.apiKey });
  }
  //FIN CRUD BASICO
  leeNotasPorTitulo(titulo: string): Promise<HTTPResponse> {
    return this.http.get(this.url + 'notas/titulo', {}, { apiKey: this.apiKey, useraccess: this.authS.user.email, title: titulo });
  }
  leeNotasPorPagina(items:number, page:number): Promise<HTTPResponse> {
    return this.http.get(this.url + 'notas/page/'+ items + '/'+ page, {}, { apiKey: this.apiKey, user: this.authS.user.email });
  }
}
