import {Component, OnInit} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {ApiResponse} from "../../../util/api.response.model";
import {AlertUtil} from "../../../util/alert.util";

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
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.users = response.data['users'];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadUsers();
          AlertUtil.showSuccess(response, this.alertService);
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    })
  }
}
