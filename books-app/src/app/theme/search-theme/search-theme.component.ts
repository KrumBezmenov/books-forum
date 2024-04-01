import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-search-theme',
  templateUrl: './search-theme.component.html',
  styleUrls: ['./search-theme.component.css'],
})
export class SearchThemeComponent implements OnInit {
  themes: Theme[] = [];
  searchComponent: string = '';
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

  get email(): string {
    let parsedUser = { name: '' };

    try {
      parsedUser = JSON.parse(this.userService.getUser());
    } catch (error) {}

    return parsedUser?.name;
  }
}
