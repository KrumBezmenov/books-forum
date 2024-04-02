import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Theme, themeDetails } from './types/theme';
import { Post } from './types/post';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const apiUrl = environment.themesUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //
  // private theme$$ = new BehaviorSubject<themeDetails | undefined>(undefined);
  constructor(private httpClient: HttpClient) {}

  getThemes() {
    return this.httpClient.get<Theme[]>(`${apiUrl}`);
  }

  getTheme(id: string) {
    return this.httpClient.get<Theme>(`${apiUrl}/${id}/details`);
  }

  // createTheme(
  //   title: string,
  //   genre: string,
  //   author: string,
  //   image: string,
  //   description: string
  // ) {
  //   const payload = { title, genre, author, image, description };
  //   return this.httpClient.post<Theme>(`${apiUrl}`, payload);
  // }

  createTheme(themeData: Theme, token: string): Observable<any> {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.post<Theme>(`${apiUrl}/create`, themeData, {
      headers: headerObject,
    });
  }

  getLatestThemes(limit?: number) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/themes`;

    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.httpClient.get<Theme[]>(url);
  }

  deleteThemeById(id: string, token: string): Observable<any> {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.get(`${apiUrl}/${id}/delete`, {
      headers: headerObject,
    });
  }

  saveThemeById(id: string, themeData: Theme, token: string): Observable<any> {
    const headerObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    return this.httpClient.post(`${apiUrl}/${id}/update`, themeData, {
      headers: headerObject,
    });
  }

  searchGame(title: string) {
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
