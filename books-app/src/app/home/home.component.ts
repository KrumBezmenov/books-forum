import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private userService: UserService) {}
  get email(): string {
    let parsedUser = { name: '' };

    try {
      parsedUser = JSON.parse(this.userService.getUser());
    } catch (error) {}

    return parsedUser?.name;
  }
}
