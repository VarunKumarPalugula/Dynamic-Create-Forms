import { AbstractControl, FormGroup } from '@angular/forms';
export class PasswordValidator {
  static validate(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let confirmPassword = registrationFormGroup.controls.confirmPassword.value;

    if (confirmPassword != undefined) {
      if (confirmPassword.length <= 0) {
        return null;
      }
    }
    if (confirmPassword != undefined && password != undefined) {
      if (confirmPassword !== password) {
        return {
          doesMatchPassword: true,
        };
      }
    }
    return null;
  }
}
