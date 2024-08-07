import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {UserService} from '../user.service';
import {AuthService} from "../../../security/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];

  successMessage?: string;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadOptions();
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      cell: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', Validators.email],
      gender: ['', Validators.required],
      address: [''],
      status: ['', Validators.required],
      dateOfBirth: [''],
      bloodGroup: [''],
      joiningDate: ['']
    });
  }


  loadOptions() {
    // Will fetch these options from the server later
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

  createUser(): void {
    if (this.userForm.valid) {
      let user: User = this.userForm.value;
      user.type = 'user';
      user.instituteId = this.authService.getSessionInstituteId();

      this.userService.createUser(user).subscribe({
        next: response => {
          this.successMessage = 'User created successfully!';
          this.userForm.reset();
          this.router.navigate(["/user-list"]);
        },
        error: error => {
          console.error('Error creating user:', error);
          this.errorMessage = 'An error occurred while creating the user.';
        }
      });
    }
  }
}
