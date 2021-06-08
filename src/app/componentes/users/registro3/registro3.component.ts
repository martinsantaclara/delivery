import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidation } from 'src/app/validations/password-validations.directive';
import { compareValidator } from 'src/app/validations/compare-validator.directive';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registro3',
  templateUrl: './registro3.component.html',
  styleUrls: ['./registro3.component.scss']
})
export class Registro3Component implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private afs: AngularFirestore) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get confirmaPassword() {
    return this.loginForm.get('confirmaPassword');
  }

  status = '';

  loginForm = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
     }],
      // updateOn: 'blur'}],
    password: ['',  { validators: [Validators.required, Validators.minLength(6), passwordValidation()] }],
    confirmaPassword: ['', { validators: [Validators.required, compareValidator('password')]}]

    // email: ['', {
    //   validators: [Validators.required],
    //   asyncValidators: [this.validateNameViaServer.bind(this)],
    //   updateOn: 'blur'}]
  });


  ngOnInit() {

    this.userService.getAllUsers().subscribe();


  }

  onLogin() {
    console.log('formulario procesado....');
  }

  emailcheck($event) {
    const q = $event.target.value;
    if (q.trim() === '') {
      this.status = 'Email is required';
    } else {
      this.status = 'Checking.. !!'
      const collref = this.afs.collection('users').ref;
      const queryref = collref.where('email', '==', q);
      queryref.get().then((snapShot) => {
        if (snapShot.empty) {
          this.status = 'valid';
        } else {
          this.status = 'Email already registered in the system, please login.. !!'
        }
      })
    }
  }

}
