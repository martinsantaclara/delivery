import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { useAnimation } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { EmailValidatorService } from 'src/app/validations/email-validator.service';
import { passwordValidation } from 'src/app/validations/password-validations.directive';

// export class CustomValidators {
//   static checkDuplicates(sus: UserService) {
//     return (c: AbstractControl) => {
//       return sus.getUserByEmail(c.value).pipe(
//         debounceTime(2000),
//         take(1),
//         map( array => array.length ? {'existe': true} : null)
//       );
//     };
//   }
// }

@Component({
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.scss']
})
export class Registro2Component implements OnInit {

  // @HostListener('mouseenter') onMouseEnter() {
  //   alert("Don't touch my bacon!");
  // }

  constructor(private fb: FormBuilder, private userService: UserService, private emailValidator: EmailValidatorService) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }



  loginForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email],
                asyncValidators: [this.emailValidator.checkDuplicates(this.userService)]}],
      // updateOn: 'blur'}],
    password: ['', [Validators.required, Validators.minLength(6), passwordValidation()]],

  });

  ngOnInit() {

  }

  onLogin() {
    console.log('procesando....');
  }

  resetear(event) {
    console.log('reset');
    console.log(event.name);

    if (document.activeElement.id === 'inputEmail') {
      // this.loginForm.controls['email'].setErrors(null);
      const element = document.getElementById('inputEmail');
      const claseInputEmail = document.activeElement.classList.value;
      document.getElementById('inputEmail').classList.remove('is-invalid');
      document.getElementById('inputEmail').classList.remove('is-valid');

    } else if (this.loginForm.controls['email'].status === 'INVALID') {
      console.log('es invalid');
      console.log(this.loginForm.controls['email'].hasError.length);
      console.log(document.getElementById('inputEmail').classList.value);
      document.getElementById('inputEmail').classList.remove('is-valid');
      document.getElementById('inputEmail').classList.add('is-invalid');
    } else {
      console.log('es valid')
      console.log(document.getElementById('inputEmail').classList.value);
      document.getElementById('inputEmail').classList.remove('is-invalid');
      document.getElementById('inputEmail').classList.add('is-valid');
    }
    // x.target.select();
  }

  validateNameViaServer({value}: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.getAllUsers();
}

}
