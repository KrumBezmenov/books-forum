import { Injectable } from '@angular/core';
import { Auth, UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

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
    email: string;
    name: string;
    password: string;
    rePassword: string;
  }) {
    const body = {
      email: params.email,
      name: params.name,
      password: params.password,
      rePassword: params.rePassword,
    };
    const stringifiedBody = JSON.stringify(body);
    return this.httpClient.post<Auth>(`${apiUrl}/register`, stringifiedBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  login(params: { email: string; password: string }) {
    const body = {
      email: params.email,
      password: params.password,
    };
    const stringifiedBody = JSON.stringify(body);
    return this.httpClient.post<Auth>(`${apiUrl}/login`, stringifiedBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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
