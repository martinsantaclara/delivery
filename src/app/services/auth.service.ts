import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  public isLogged = new BehaviorSubject<boolean>(this.checkIsLogin());
  public idUsuario = new BehaviorSubject<string>(localStorage.getItem('idUsuario'));
  public nombreUsuario = new BehaviorSubject<string>(localStorage.getItem('nombreUsuario'));
  public urlImagenUsuario = new BehaviorSubject<string>(localStorage.getItem('urlImagenUsuario'));
  public direccionUsuario = new BehaviorSubject<string>(localStorage.getItem('direccion'));
  public telefonoUsuario = new BehaviorSubject<string>(localStorage.getItem('telefono'));

  checkIsLogin() {
    if (JSON.parse(localStorage.getItem('usuario')) !== null) {
      return true;
    } else {
      return false;
    }
  }

  get getIsLogged() {
        return this.isLogged.asObservable();
  }

  get getIdUsuario() {
      return this.idUsuario.asObservable();
  }

  get getNombreUsuario() {
    return this.nombreUsuario.asObservable();
  }

  get getUrlImagenUsuario() {
    return this.urlImagenUsuario.asObservable();
  }

  get getDireccionUsuario() {
    return this.direccionUsuario.asObservable();
  }

  get getTelefonoUsuario() {
    return this.telefonoUsuario.asObservable();
  }

  async loginEmailUser(email: string, password: string) {
    console.log(email);
    const result = await this.afsAuth.signInWithEmailAndPassword(email, password);
    console.log(result);
    return result.user;
  }

  async registerUser(email: string, password: string) {
    const result = await this.afsAuth.createUserWithEmailAndPassword(email, password);
    return result.user;
  }

  async loginGoogleUser() {
    const result = await this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider());
    return result.user;
  }

  async loginFacebookUser() {
    const result = await this.afsAuth.signInWithPopup(new auth.FacebookAuthProvider());
    return result.user;
  }

  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.afsAuth.authState.pipe(map( auth => auth));
  }


}
