import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  checkDuplicates(sus: UserService) {
    return (c: AbstractControl) => {
      return sus.getUserByEmail(c.value).pipe(
        debounceTime(1000),
        take(1),
        map( array => array.length ? {'existe': true} : null)
      );
    };
  }

}
