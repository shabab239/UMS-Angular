import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {AuthService} from "../../../security/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user.model";
import {FileUtils} from "../../../util/file.util";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{

  errors: Map<string, string> = new Map<string, string>();

  user: User = new User();

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe({
      next: response => {
        this.user = Object.assign(new User(), response);
        this.user.avatar = ''; //Setting avatar base64 to empty
      },
      error: error => {
        alert('Could not load user');
      }
    });
    this.loadOptions();
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

  async updateUser(): Promise<void> {

    this.user.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    this.user.type = 'user';
    this.user.instituteId = this.authService.getSessionInstituteId();

    if (this.user.avatar instanceof File) {
      try {
        this.user.avatar = await FileUtils.convertFileToBase64(this.user.avatar);
      } catch (error) {
        this.errors.set('avatar', 'An error occurred while processing the avatar.');
        return;
      }
    }
    this.userService.updateUser(this.user).subscribe({
      next: response => {
        //this.successMessage = 'User created successfully!';
        this.user = new User();
        this.router.navigate(["/user-list"]);
      },
      error: error => {
        alert('An error occurred while creating the user.');
      }
    });

  }

}
