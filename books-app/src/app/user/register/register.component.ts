import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  USER_KEY = '[user]';
  TOKEN_KEY = '[token]';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  form = this.fb.group({
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passGroup: { password, rePassword } = {} } = this.form.value;
    const formData = this.form.value;
    const formBody = {
      email: email,
      name: email,
      password: formData.passGroup?.password,
      rePassword: formData.passGroup?.rePassword,
    };

    this.userService.register(formBody).subscribe((data) => {
      localStorage.setItem(this.TOKEN_KEY, data.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(data));
      this.userService.token = data.token;
      this.router.navigate(['/home']);
    });
  }
}
