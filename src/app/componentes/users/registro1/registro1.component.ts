import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidation } from 'src/app/validations/password-validations.directive';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.component.html',
  styleUrls: ['./registro1.component.scss']
})
export class Registro1Component implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginForm = this.formBuilder.group({
    email: ['', {
      validators: [Validators.required]
      // updateOn: 'blur'
    }],
    password: ['',  { validators: [Validators.required, Validators.minLength(6), passwordValidation()]
                    }]
  });

  ngOnInit() {
  }

  onLogin() {
    console.log(this.loginForm.value);
  }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:');
 }

//  @HostListener('focus', ['$event'])
  @HostListener('focusin', ['$event'])
  public onFocus(event) {
    const email = document.getElementById('inputEmail');
    if (document.activeElement.id === 'inputEmail') {
      console.log('focus en email', document.activeElement);
    }
  }

  limpiarDatos() {
    this.loginForm.patchValue({email: '', password: ''});
  }


  clickSignUp() {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  }

  clickSignIn() {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  }


}
