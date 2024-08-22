import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {Department} from "../model/department.model";
import {DepartmentService} from "../department.service";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: response => {
        this.departments = response.map(department => Object.assign(new Department(), department));
      },
      error: error => {

      }
    });
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe({
      next: response => {
        this.alertService.warning('Department deleted successfully!');
        this.loadDepartments();
      },
      error: error => {
        this.alertService.error('Could not delete department.');
      }
    })
  }
}
