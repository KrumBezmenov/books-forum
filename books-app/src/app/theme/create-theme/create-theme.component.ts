import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css'],
})
export class CreateThemeComponent {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  // createTheme(ev: Event, title: string, postText: string) {
  //   // ev.preventDefault();
  //   // this.apiService.createTheme(title, postText).subscribe();
  // }
  createTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // const { title, genre, author, image, description } = form.value;
    // this.apiService
    //   .createTheme(title, genre, author, image, description)
    //   .subscribe(() => {
    //     this.router.navigate(['/themes']);
    //   });
    const token = this.userService.getToken();
    const themeData = form.value;
    // console.log(themeData, token);

    this.apiService.createTheme(themeData, token).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}
