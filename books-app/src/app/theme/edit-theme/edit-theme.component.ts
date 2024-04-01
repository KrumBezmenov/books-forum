import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Theme, themeDetails } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css'],
})
export class EditThemeComponent implements OnInit {
  myForm!: FormGroup;
  theme = {} as Theme;
  title1 = 'Title One';

  ///////
  // showEditMode: boolean = false;
  // onToggle(): void {
  //   this.showEditMode = !this.showEditMode;
  // }

  // themeDetails: themeDetails = {
  //   title: '',
  //   genre: '',
  //   author: '',
  //   image: '',
  //   description: '',
  // };

  // form = this.fb.group({
  //   title: ['', [Validators.required, Validators.minLength(1)]],
  //   genre: ['', [Validators.required, Validators.minLength(3)]],
  //   author: ['', [Validators.required, Validators.minLength(3)]],
  //   image: ['', [Validators.required, Validators.minLength(3)]],
  //   description: ['', [Validators.required, Validators.minLength(10)]],
  // });

  //////

  constructor(
    private fb: FormBuilder,
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

  // ngOnInit(): void {
  //   const { title, genre, author, image, description } = this.theme;

  //   this.themeDetails = {
  //     title,
  //     genre,
  //     author,
  //     image,
  //     description,
  //   };

  //   this.form.setValue({
  //     title,
  //     genre,
  //     author,
  //     image,
  //     description,
  //   });
  // }

  // saveTheme(): void {
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   this.themeDetails = this.form.value as themeDetails;
  //   const { title, genre, author, image, description } = this.themeDetails;
  //   this.api
  //     .updateTheme(title, genre, author, image, description)
  //     .subscribe(() => {
  //       this.onToggle();
  //     });
  // }
  ngOnInit(): void {
    console.log();
    this.activeRoute.params.subscribe((data) => {
      const id = data['themeId'];
      this.api.getTheme(id).subscribe((theme) => {
        this.theme = theme;
        this.populateForm(theme);
        console.log(this.theme);
      });
    });
  }

  saveTheme(form: NgForm) {
    console.log('FORM', form);
    if (form.invalid) {
      return;
    }
    const token = this.userService.getToken();
    const id = this.theme._id;
    const themeData = form.value;
    console.log(themeData, id, token);
    this.api.saveThemeById(id, themeData, token).subscribe((data) => {
      this.router.navigate(['/themes']);
    });
  }

  populateForm(theme: Theme): void {
    // this.myForm.patchValue({
    //   image: theme.image,
    //   description: theme.description,
    // });
  }
}
