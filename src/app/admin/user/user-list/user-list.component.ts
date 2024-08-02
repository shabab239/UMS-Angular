import {Component} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  pageTitle: string = 'User List';
  breadcrumbs: string[] = ['Home', 'Users'];

  users: User[] = [];

  constructor(private userService: UserService) {

  }


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: response => {
        this.users = response.map(user => Object.assign(new User(), user));
      },
      error: error => {

      }
    });
  }

  editUser(userId?: number) {

  }

  deleteUser(userId?: number) {

  }
}
