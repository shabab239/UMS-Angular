import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user.model";
import {UserService} from "../user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.loadUser(userId);
    } else {
      this.alertService.error('No user ID provided.');
    }
  }

  private loadUser(userId: number): void {
    this.userService.getUser(userId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.user = response.data['user'];
        } else {
          this.alertService.error(response?.message || 'Failed to load user data.');
        }
      },
      error: error => {
        this.alertService.error('An error occurred while loading the user.');
      }
    });
  }
}
