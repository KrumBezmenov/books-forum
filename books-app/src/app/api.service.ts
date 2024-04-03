import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Theme } from './types/theme';
import { Observable } from 'rxjs';

const apiUrl = environment.themesUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getThemes() {
    return this.httpClient.get<Theme[]>(`${apiUrl}`);
  }

  getTheme(id: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.httpClient.get<Theme>(`${apiUrl}/${id}/details`, {
      headers: headerObject,
    });
  }

  getThemeAuth(id: string, token: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };
    return this.httpClient.get<Theme>(`${apiUrl}/${id}/details`, {
      headers: headerObject,
    });
  }

  createTheme(themeData: Theme, token: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.post<Theme>(`${apiUrl}/create`, themeData, {
      headers: headerObject,
    });
  }

  deleteThemeById(id: string, token: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.get(`${apiUrl}/${id}/delete`, {
      headers: headerObject,
    });
  }

  saveThemeById(id: string, themeData: Theme, token: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.post(`${apiUrl}/${id}/update`, themeData, {
      headers: headerObject,
    });
  }

  searchTheme(title: string) {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.httpClient.get<Theme[]>(`${apiUrl}/search`, {
      headers: headerObject,
      params: { q: title },
    });
  }
}
