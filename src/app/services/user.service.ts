import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserI } from '../interfaces/user';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  getUserByEmail(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges({idField: 'id'});

    // return this.afs.collection<any>('users').valueChanges({idField: 'id'}).pipe(
    //   map(users => {
    //     const usuario = [];
    //     for ( const user of users) {
    //       if (emailRegistro === user.email) {
    //         usuario.push(user.email);
    //       }
    //     }
    //     return usuario;
    //   }),
    //   tap(users => console.log(users))
    // );
  }


  getAllUsers(): Observable<UserI[]>  {
    return this.afs.collection<UserI>('users').valueChanges({idField: 'id'});
  }

  getUser(uid: string): Observable<UserI> {
    console.log(uid);
    return this.afs.doc<UserI>(`users/${uid}`).valueChanges();
  }

  updateUser(uid, nombre, correo, photoURL, dire, tel) {
    const data: UserI = {
      id: uid,
      name: nombre,
      email: correo,
      photoUrl: photoURL,
      direccion: dire,
      telefono: tel,
      roles: {
        editor: true
      }
    };
    return new Promise<UserI>(resolve => {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      userRef.set(data, { merge: true });
      resolve(data);
    });
  }

  loginThen(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('idUsuario', usuario.email);
    localStorage.setItem('nombreUsuario', usuario.name);
    localStorage.setItem('urlImagenUsuario', usuario.photoUrl);
    localStorage.setItem('direccionUsuario', usuario.direccion);
    localStorage.setItem('telefonoUsuario', usuario.telefono);

    this.authService.isLogged.next(true);
    this.authService.idUsuario.next(localStorage.getItem('idUsuario'));
    this.authService.nombreUsuario.next(localStorage.getItem('nombreUsuario'));
    this.authService.urlImagenUsuario.next(localStorage.getItem('urlImagenUsuario'));
    this.authService.direccionUsuario.next(localStorage.getItem('direccionUsuario'));
    this.authService.telefonoUsuario.next(localStorage.getItem('telefonoUsuario'));

  }
}
