import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private myCollection:AngularFirestoreCollection<any>;

  public notas:Nota[] = [];
  
  constructor(private fire:AngularFirestore, private authS: AuthService) {     
    this.coleccion();
  }

  coleccion(){
    this.myCollection=this.fire.collection<any>(environment.notasCollection + " " + this.authS.user.email);
  }

  agregaNota(nuevaNota:Nota):Promise<any>{
    return this.myCollection.add(nuevaNota);
  }
  leeNotas():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }
  leeNota(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
  }
  actualizaNota(id:any,nuevaNota:Nota):Promise<void>{
    return this.myCollection.doc(id).update({titulo:nuevaNota.titulo,texto:nuevaNota.texto});
  }
  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
  //FIN CRUD BASICO
  leeNotasPorTitulo(titulo:string){
    return this.fire.collection<any>(environment.notasCollection + " " + this.authS.user.email).ref.orderBy('titulo').startAt(titulo);
  }
}
