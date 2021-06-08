import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { compareValidator } from 'src/app/validations/compare-validator.directive';
import { EmailValidatorService } from 'src/app/validations/email-validator.service';
import { passwordValidation } from 'src/app/validations/password-validations.directive';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm: FormGroup;
  public isError = false;

  constructor(private router: Router, private authService: AuthService, private fBuilder: FormBuilder,
              private afAuth: AngularFireAuth, private userService: UserService, private emailValidator: EmailValidatorService) {

    this.registerForm = this.fBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)],
                  [this.emailValidator.checkDuplicates(this.userService)]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidation()]],
      confirmPassword: ['', [Validators.required, compareValidator('password')]],
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onRegister() {
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;

    if (password !== confirmPassword) {
        this.isError = true;
    } else {
      this.registerEmailAndPassword()
      .then((usuario) => {
          this.userService.loginThen(usuario);
      })
      .catch(err => {
        console.log(err.code);
        console.log(err.message);
        this.isError = true;
      })
      .finally(() => {
        if (!this.isError) {
          this.onRedirect();
        }
      });
    }
  }

  async registerEmailAndPassword() {
    const nombre = this.registerForm.get('nombre').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const direccion = this.registerForm.get('direccion').value;
    const telefono = this.registerForm.get('telefono').value;
    const urlImagenUsuario = './assets/imagenes/userProfile.png';

    const user = await this.authService.registerUser(email, password);
    user.updateProfile({ displayName: nombre, photoURL: urlImagenUsuario });
    const usuario = await this.userService.updateUser(user.uid, nombre, email, urlImagenUsuario, direccion, telefono);
    return usuario;
  }

  onRedirect(): void {
    this.router.navigate(['/home']);
    // history.go(-2);
    // history.back();
  }

  onFocus() {
    this.isError = false;
    console.log(this.registerForm.controls['email'].status);

  }



  get nombre() { return this.registerForm.get('nombre'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get direccion() { return this.registerForm.get('direccion'); }
  get telefono() { return this.registerForm.get('telefono'); }

}
