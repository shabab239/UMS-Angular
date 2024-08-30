import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../department.service';
import {AlertService} from "../../../util/alert.service";
import {AlertUtil} from "../../../util/alert.util";
import {ApiResponse} from "../../../util/api.response.model";
import {Department} from '../model/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  errors: { [key: string]: string } = {};

  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.departments = response.data['departments'];
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

  deleteDepartment(id: number): void {
    this.departmentService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadDepartments();
          AlertUtil.showSuccess(response, this.alertService);
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
