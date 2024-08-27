import {Component, OnInit} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {ApiResponse} from "../../../util/api.response.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: response => {
        if (response && response.successful) {
          this.users = response.data['users'];
        } else {
          this.alertService.error(response?.message || 'Failed to load users.');
        }
      },
      error: error => {
        this.alertService.error(error.message);
      }
    });
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
