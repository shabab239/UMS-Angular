import {Component, OnInit} from '@angular/core';
import {Faculty} from "../../faculty/model/faculty.model";
import {FacultyService} from "../../faculty/faculty.service";
import {AuthService} from "../../../security/auth/auth.service";
import {Router} from "@angular/router";
import {Department} from "../model/department.model";
import {DepartmentService} from "../department.service";

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrl: './department-create.component.css'
})
export class DepartmentCreateComponent implements OnInit {

  department: Department = new Department();
  faculties?: Faculty[];

  constructor(
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.department.faculty = new Faculty();
    this.loadFaculties();
  }

  private loadFaculties() {
    this.facultyService.getFaculties().subscribe({
      next: response => {
        this.faculties = response;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  protected createDepartment() {

    const selectedFaculty = this.faculties?.find(faculty => faculty.id === this.department.faculty.id);
    if (selectedFaculty) {
      this.department.faculty = selectedFaculty;
    }

    this.departmentService.createDepartment(this.department).subscribe({
      next: response => {
        this.department = new Department();
        this.department.faculty = new Faculty();
        this.router.navigate(['/department-list']);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
