import {Component, OnInit} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {

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


  createUser() {
    this.router.navigate(['/user-create']);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: response => {
        this.alertService.success('User deleted successfully!');
        this.loadUsers();
      },
      error: error => {
        this.alertService.error('Could not delete user.');
      }
    })
  }
}
