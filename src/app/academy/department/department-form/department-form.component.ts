import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from "../model/department.model";
import { DepartmentService } from "../department.service";
import { UserService } from "../../../admin/user/user.service";
import { AlertService } from "../../../util/alert.service";
import { AlertUtil } from "../../../util/alert.util";
import { ApiResponse } from "../../../util/api.response.model";
import { User } from '../../../admin/user/model/user.model';
import {Faculty} from "../../faculty/model/faculty.model";
import {FacultyService} from "../../faculty/faculty.service";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  department: Department = new Department();
  departmentId?: number;

  errors: { [key: string]: string } = {};
  headOptions: User[] = [];
  facultyOptions: Faculty[] = [];

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private facultyService: FacultyService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadOptions();

    this.departmentId = this.route.snapshot.params['id'];
    if (this.departmentId) {
      this.departmentService.getById(this.departmentId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.department = response.data['department'];
            // Ensure department.head is always defined
            if (!this.department.head) {
              this.department.head = new User();
            }
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

  loadOptions(): void {
    this.userService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.headOptions = response.data['users'];
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });

    this.facultyService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.facultyOptions = response.data['faculties'];
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

  createOrUpdateDepartment(): void {
    const departmentObservable = this.departmentId
      ? this.departmentService.update(this.department)
      : this.departmentService.create(this.department);

    departmentObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.department = new Department();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/department-list']);
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
