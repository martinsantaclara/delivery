import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  usuario: User;
  urlImagenUsuario: string;
  isLogged: boolean;
  url: string;

  ngOnInit() {

    this.authService.getIsLogged.subscribe( log => this.isLogged = log);
    this.authService.getUrlImagenUsuario.subscribe( url => this.urlImagenUsuario = url);

  }

  onLogout() {
    firebase.auth().signOut()
    .then( () => {
      if (this.router.url === '/user/profile') {
        history.go(-1);
      } else {
        history.go(0);
      }
      localStorage.removeItem('usuario');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('urlImagenUsuario');
      localStorage.removeItem('direccionUsuario');
      localStorage.removeItem('telefonoUsuario');

      this.authService.getIsLogged.subscribe( log =>  this.isLogged = log);
      this.authService.getUrlImagenUsuario.subscribe( url =>  this.urlImagenUsuario = url);

    }, (error) => {
      console.error('Sign Out Error', error);
    });
  }

}
