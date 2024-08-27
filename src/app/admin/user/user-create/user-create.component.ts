import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { AuthService } from "../../../security/auth/auth.service";
import { Router } from "@angular/router";
import { FormUtils } from '../../../util/form.util';
import { FileUtils } from '../../../util/file.util';
import {AlertService} from "../../../util/alert.service";

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
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
      joiningDate: [''],
      avatar: []
    });
  }


  loadOptions() {
    // Will fetch these options from the server later
    this.genderOptions = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' }
    ];

    this.statusOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Suspended', label: 'Suspended' },
      { value: 'Archived', label: 'Archived' }
    ];

    this.bloodGroupOptions = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' }
    ];

  }

  onAvatarPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.userForm.patchValue({ avatar: file });
  }

  async createUser(): Promise<void> {

    FormUtils.markFormGroupTouched(this.userForm);

    if (this.userForm.invalid) {
      return;
    }

    let user: User = this.userForm.value;
    //user.type = 'user';

    user.avatar = undefined;
    /*if (user.avatar instanceof File) {
      try {
        user.avatar = await FileUtils.convertFileToBase64(user.avatar);
      } catch (error) {
        this.alertService.error('An error occurred while processing the avatar.');
        return;
      }
    }*/

    this.userService.createUser(user).subscribe({
      next: response => {
        this.alertService.success('User created successfully!');
        this.userForm.reset();
        this.router.navigate(["/user-list"]);
      },
      error: error => {
        this.alertService.error('An error occurred while creating the user.');
      }
    });

  }


}
