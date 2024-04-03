import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css'],
})
export class EditThemeComponent implements OnInit {
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
    this.activeRoute.params.subscribe((data) => {
      const id = data['themeId'];
      this.api.getTheme(id).subscribe((theme) => {
        this.theme = theme;
      });
    });
  }

  saveTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const token = this.userService.getToken();
    const id = this.theme._id;
    const themeData = form.value;

    this.api.saveThemeById(id, themeData, token).subscribe((data) => {
      this.router.navigate(['/themes']);
    });
  }
}
