import {Component, OnInit} from '@angular/core';
import {Faculty} from "../../faculty/model/faculty.model";
import {FacultyService} from "../../faculty/faculty.service";
import {AuthService} from "../../../security/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Department} from "../model/department.model";
import {DepartmentService} from "../department.service";
import {User} from "../../../admin/user/model/user.model";
import {UserService} from "../../../admin/user/user.service";
import {AlertService} from "../../../util/alert.service";
import {FormUtils} from "../../../util/form.util";

@Component({
  selector: 'app-department-create',
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent implements OnInit {

  errors: Map<string, string> = new Map<string, string>();

  department: Department = new Department();
  faculties?: Faculty[];
  users?: User[];

  departmentId?: number;

  constructor(
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadFaculties();
    this.loadUsers();

    this.departmentId = this.route.snapshot.params['id'];
    if (this.departmentId) {
      this.departmentService.getDepartment(this.departmentId).subscribe({
        next: response => {
          this.department = Object.assign(new Department(), response);
        },
        error: error => {
          this.alertService.error('An error occurred while loading department.');
        }
      })
    }
  }

  private loadFaculties() {
    this.facultyService.getFaculties().subscribe({
      next: response => {
        this.faculties = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading faculties.');
      }
    })
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

  protected submitDepartment() {

    this.department.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    const selectedFaculty = this.faculties?.find(faculty => faculty.id === this.department.faculty.id);
    if (selectedFaculty) {
      this.department.faculty = selectedFaculty;
    }

    const selectedHead = this.users?.find(user => user.id === this.department.head.id);
    if (selectedHead) {
      this.department.head = selectedHead;
    }

    if (!this.departmentId) {
      this.departmentService.createDepartment(this.department).subscribe({
        next: response => {
          this.department = new Department();
          this.department.faculty = new Faculty();
          this.router.navigate(['/department-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while creating department.');
        }
      });
    } else {
      this.departmentService.updateDepartment(this.department).subscribe({
        next: response => {
          this.department = new Department();
          this.department.faculty = new Faculty();
          this.router.navigate(['/department-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while updating department.');
        }
      });
    }


  }

}
