import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserI } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginForm: FormGroup;
  public isError = false;
  usuario: UserI;

  constructor(private router: Router, private authService: AuthService, private fBuilder: FormBuilder,
              private userService: UserService) {

    this.loginForm = this.fBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.loginEmailUser(email, password)
      .then((user) => {
        this.isError = false;
        return user;
      })
      .then((user) => {

        console.log('usuario');
        console.log(user.uid);


        this.userService.getUser(user.uid).subscribe( usu => {
          this.usuario = usu;
          this.usuario.id = user.uid;
          this.userService.loginThen(this.usuario);
        });
      })
      .catch(err => this.isError = true)
      .finally(() => {
        if (!this.isError) {
          this.onLoginRedirect();
        }
      });
  }

  onLoginGoogle() {
    this.onLoginAsync()
    .then((usu) => {
      this.isError = false;
      this.userService.loginThen(usu);
    })
    .catch(err => {
      this.isError = true;
    })
    .finally(() => {
      if (!this.isError) {
        this.onLoginRedirect();
      } else {
        setTimeout(() => { this.isError = false; }, 500 );
      }
    });
  }

  async onLoginAsync() {
    this.isError = false;
    const user = await this.authService.loginGoogleUser();
    this.isError = false;
    const direccion = 'Marcos Paz y Martín Güemes (desde Login----)';
    const telefono = '3751 408245 (desde Login----)';
    const usuario = await this.userService.updateUser(user.uid, user.displayName, user.email, user.photoURL, direccion, telefono);
    return usuario;
  }

  onLoginFacebook(): void {
  //   this.authService.loginFacebookUser()
  //     .then(() => {
  //       this.onLoginRedirect();
  //     }).catch(err => this.isError = true);
  }

  onLoginRedirect(): void {
    history.back();
  }

  onFocus() {
    this.isError = false;
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
