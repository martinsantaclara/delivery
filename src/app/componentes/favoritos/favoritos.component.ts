import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'src/app/services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatasourceService } from 'src/app/services/datasource.service';
import { UserI } from 'src/app/interfaces/user';
import { User } from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private toastrService: ToastrService, private afsAuth: AngularFireAuth,
              private datasource: DatasourceService, private afs: AngularFirestore, private authService: AuthService) { }
  isError = false;
  ngOnInit() {

    this.spinner.show();

    setTimeout(() => { this.spinner.hide(); }, 2000);

    this.onLoginGoogle().then( (usu) => {
      this.loginThen(usu);

      console.log(usu);
    });
}


  async onLoginGoogle() {
    const user = await this.loginGoogleUserFavorito();
    console.log('entre asyncs');
    const direccion = 'Colon 345';
    const telefono = '460999';
    const usuario: UserI = await this
                                   .updateUsuario(user.uid, user.displayName, user.email, user.photoURL, direccion, telefono);
    return usuario;
  }

  loginGoogleUserFavorito() {
    return new Promise<User> ( resolve  => {
      this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then( usuario => {
        console.log('google user favorito');
        resolve(usuario.user);
      });
    });
  }

  updateUsuario(id: string, name: string, email: string, photoUrl: string, direccion: string, telefono: string) {
    const data: UserI = {
      name,
      email,
      photoUrl,
      direccion,
      telefono,
      roles: {editor: true} };
    console.log('update usuario');
    return new Promise<UserI> ( resolve  => {
      this.afs.collection('users').doc<UserI>(id).update({name,
        email,
        photoUrl,
        direccion,
        telefono});
      resolve(data);
    });
  }

  onLoginRedirect() {
    history.back();
  }

  loginThen(user: UserI) {
    console.log('login then');

    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.setItem('idUsuario', user.email);
    localStorage.setItem('nombreUsuario', user.name);
    localStorage.setItem('urlImagenUsuario', user.photoUrl);
    localStorage.setItem('direccionUsuario', user.direccion);
    localStorage.setItem('telefonoUsuario', user.telefono);

    this.authService.isLogged.next(true);
    this.authService.idUsuario.next(localStorage.getItem('idUsuario'));
    this.authService.nombreUsuario.next(localStorage.getItem('nombreUsuario'));
    this.authService.urlImagenUsuario.next(localStorage.getItem('urlImagenUsuario'));
    this.authService.direccionUsuario.next(localStorage.getItem('direccionUsuario'));
    this.authService.telefonoUsuario.next(localStorage.getItem('telefonoUsuario'));
  }


  message() {
    this.toastrService.success('Adding Product to Cart', 'Product Adding to the cart');
  }

  message1() {
    this.toastrService.info('Adding Product to Cart', 'Product Adding to the cart');
  }

  message2() {
    this.toastrService.warning('Adding Product to Cart', 'Product Adding to the cart');
  }

  message3() {
    this.toastrService.error('Adding Product to Cart', 'Product Adding to the cart');
  }

  message4() {
    this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
  }


}
