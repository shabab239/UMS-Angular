import {Component} from '@angular/core';
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  user: User = new User();

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: response => {
          this.user = Object.assign(new User(), response);
        },
        error: error => {
          this.alertService.error('An error occurred while loading user.');
        }
      })
    }
  }
}
