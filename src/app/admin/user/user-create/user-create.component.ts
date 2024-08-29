import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User = new User();

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];

  errors: { [key: string]: string } = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  createUser(): void {
    this.userService.createUser(this.user).subscribe({
      next: response => {
        this.alertService.success('User created successfully!');
        this.user = new User();
        this.errors = {};
        this.router.navigate(['/user-list']);
      },
      error: error => {
        this.alertService.error('An error occurred while creating the user.');
        if (error.error?.errors) {
          this.errors = error.error.errors;
        }
      }
    });
  }

  loadOptions() {
    this.genderOptions = [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Other', label: 'Other'}
    ];

    this.statusOptions = [
      {value: 'ACTIVE', label: 'Active'},
      {value: 'INACTIVE', label: 'Inactive'},
      {value: 'PENDING', label: 'Pending'},
      {value: 'SUSPENDED', label: 'Suspended'},
      {value: 'ARCHIVED', label: 'Archived'}
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

