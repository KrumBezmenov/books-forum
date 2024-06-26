import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  theme = {} as Theme;
  constructor(
    private api: ApiService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  get userId(): string {
    return this.userService.user?.id || '';
  }
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    const token = this.userService.getToken();
    this.activeRoute.params.subscribe((data) => {
      const id = data['themeId'];
      if (token) {
        this.api.getThemeAuth(id, token).subscribe((theme) => {
          this.theme = theme;
        });
      } else {
        this.api.getTheme(id).subscribe((theme) => {
          this.theme = theme;
        });
      }
    });
  }
  deleteThemeById(id: string): void {
    const token = this.userService.getToken();

    this.api.deleteThemeById(id, token).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}
