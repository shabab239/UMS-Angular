import {User} from '../../../admin/user/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Faculty} from "../model/faculty.model";
import {FacultyService} from "../faculty.service";
import {UserService} from "../../../admin/user/user.service";
import {AlertService} from "../../../util/alert.service";
import {AlertUtil} from "../../../util/alert.util";
import {ApiResponse} from "../../../util/api.response.model";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css']
})
export class FacultyFormComponent implements OnInit {
  faculty: Faculty = new Faculty();
  facultyId?: number;

  errors: { [key: string]: string } = {};
  deanOptions: User[] = [];

  constructor(
    private facultyService: FacultyService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadDeans();

    this.facultyId = this.route.snapshot.params['id'];
    if (this.facultyId) {
      this.facultyService.getById(this.facultyId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.faculty = response.data['faculty'];
          } else {
            AlertUtil.showError(response, this.alertService);
          }
        },
        error: error => {
          AlertUtil.showError(error, this.alertService);
        }
      });
    }
  }

  loadDeans(): void {
    this.userService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.deanOptions = response.data['users'];
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

  createFaculty(): void {
    const facultyObservable = this.facultyId
      ? this.facultyService.update(this.faculty)
      : this.facultyService.create(this.faculty);

    facultyObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.faculty = new Faculty();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/faculty-list']);
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
}
