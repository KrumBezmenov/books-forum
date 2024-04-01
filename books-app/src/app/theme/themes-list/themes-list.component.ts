import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css'],
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];
  constructor(private api: ApiService, private userService: UserService) {}

  get userId(): string {
    return this.userService.user?.id || '';
  }
  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      // console.log(themes);
      this.themes = themes;
    });
  }
}
