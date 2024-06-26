import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  domains = EMAIL_DOMAINS;
  USER_KEY = '[user]';
  TOKEN_KEY = '[token]';
  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    const { email, password } = form.value;
    this.userService
      .login({ email: email, password: password })
      .subscribe((data) => {
        localStorage.setItem(this.TOKEN_KEY, data.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(data));
        this.userService.token = data.token;
        this.router.navigate(['/home']);
      });
  }
}
