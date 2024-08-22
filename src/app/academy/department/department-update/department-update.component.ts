import {Component, OnInit} from '@angular/core';
import {Department} from "../model/department.model";
import {Faculty} from "../../faculty/model/faculty.model";
import {DepartmentService} from "../department.service";
import {FacultyService} from "../../faculty/faculty.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrl: './department-update.component.css'
})
export class DepartmentUpdateComponent implements OnInit {
  department: Department = new Department();
  faculties?: Faculty[];

  constructor(
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.department.faculty = new Faculty();

    const departmentId = this.route.snapshot.params['id'];
    this.departmentService.getDepartment(departmentId).subscribe({
      next: response => {
        this.department = response;
      },
      error: error => {
        console.log(error);
      }
    })

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

  protected updateDepartment() {

    const selectedFaculty = this.faculties?.find(faculty => faculty.id === this.department.faculty.id);
    if (selectedFaculty) {
      this.department.faculty = selectedFaculty;
    }

    this.departmentService.updateDepartment(this.department).subscribe({
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
