import {Component, OnInit} from '@angular/core';
import {Faculty} from "../model/faculty.model";
import {UserService} from "../../../admin/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FacultyService} from "../faculty.service";
import {User} from "../../../admin/user/model/user.model";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.css'
})
export class FacultyFormComponent implements OnInit {

  errors: Map<string, string> = new Map<string, string>();

  faculty: Faculty = new Faculty();
  users?: User[];

  facultyId?: number;

  constructor(
    private facultyService: FacultyService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();

    this.facultyId = this.route.snapshot.params['id'];
    if (this.facultyId) {
      this.facultyService.getFaculty(this.facultyId).subscribe({
        next: response => {
          this.faculty = Object.assign(new Faculty(), response);
        },
        error: error => {
          this.alertService.error('An error occurred while loading faculty.');
        }
      })
    }
  }

  private loadUsers() {
    this.userService.getUsers().subscribe({
      next: response => {
        this.users = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading users.');
      }
    })
  }

  protected submitFaculty() {

    this.faculty.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    const selectedDean = this.users?.find(user => user.id === this.faculty.dean.id);
    if (selectedDean) {
      this.faculty.dean = selectedDean;
    }

    if (!this.facultyId) {
      this.facultyService.createFaculty(this.faculty).subscribe({
        next: response => {
          this.faculty = new Faculty();
          this.faculty.dean = new User();
          this.router.navigate(['/faculty-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while creating faculty.');
        }
      });
    } else {
      this.facultyService.updateFaculty(this.faculty).subscribe({
        next: response => {
          this.faculty = new Faculty();
          this.faculty.dean = new User();
          this.router.navigate(['/faculty-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while updating faculty.');
        }
      });
    }


  }

}
