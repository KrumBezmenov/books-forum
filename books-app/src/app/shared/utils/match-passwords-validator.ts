import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControl: string,
  rePasswordControl: string
): ValidatorFn {
  return (control) => {
    const passOne = control.get(passwordControl);
    const passTwo = control.get(rePasswordControl);
    const areMatching = passOne?.value == passTwo?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
