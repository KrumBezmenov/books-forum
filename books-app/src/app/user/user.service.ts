import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserForAuth | undefined;
  token: string = '';
  TOKEN_KEY = '[token]';
  USER_KEY = '[user]';
  get isLogged(): boolean {
    let isValid = false;
    this.token = this.getToken();
    if (this.token) {
      isValid = true;
    }

    return isValid;
  }

  constructor(private httpClient: HttpClient) {
    try {
      const isUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(isUser);
    } catch (error) {}
  }

  register(params: {
    email: any;
    name: any;
    password: any;
    rePassword: any;
  }): Observable<any> {
    const body = {
      email: params.email,
      name: params.name,
      password: params.password,
      rePassword: params.rePassword,
    };
    const stringifiedBody = JSON.stringify(body);
    return this.httpClient.post(
      'http://localhost:4000/auth/register',
      stringifiedBody,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  login(params: { email: any; password: any }): Observable<any> {
    const body = {
      email: params.email,
      password: params.password,
    };
    const stringifiedBody = JSON.stringify(body);
    return this.httpClient.post(
      'http://localhost:4000/auth/login',
      stringifiedBody,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken() {
    return localStorage[this.TOKEN_KEY];
  }

  getUser() {
    return localStorage[this.USER_KEY];
  }
}
