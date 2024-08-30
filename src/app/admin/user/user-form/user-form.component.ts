import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../../../util/api.response.model";
import {AlertUtil} from "../../../util/alert.util";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  userId?: number;
  avatarFile?: File;

  errors: { [key: string]: string } = {};

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];
  roleOptions: { value: string, label: string }[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadOptions();

    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.userService.getById(this.userId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.user = response.data['user'];
            this.user.avatar = undefined;
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

  onAvatarPicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files[0];
    }
  }

  createOrUpdateUser(): void {

    const userObservable: Observable<ApiResponse> = this.userId
      ? this.userService.update(this.user, this.avatarFile)
      : this.userService.create(this.user, this.avatarFile);

    userObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.user = new User();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/user-list']);
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });

  }

  loadOptions() {
    // will fetch later from server
    this.roleOptions = [
      {value: 'ROLE_ADMIN', label: 'Admin'},
      {value: 'ROLE_STAFF', label: 'Staff'},
      {value: 'ROLE_TEACHER', label: 'Teacher'}
    ];

    this.genderOptions = [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Other', label: 'Other'}
    ];

    this.statusOptions = [
      {value: 'Active', label: 'Active'},
      {value: 'Inactive', label: 'Inactive'},
      {value: 'Pending', label: 'Pending'},
      {value: 'Suspended', label: 'Suspended'},
      {value: 'Archived', label: 'Archived'}
    ];

    this.bloodGroupOptions = [
      {value: 'A+', label: 'A+'},
      {value: 'A-', label: 'A-'},
      {value: 'B+', label: 'B+'},
      {value: 'B-', label: 'B-'},
      {value: 'AB+', label: 'AB+'},
      {value: 'AB-', label: 'AB-'},
      {value: 'O+', label: 'O+'},
      {value: 'O-', label: 'O-'}
    ];
  }
}

