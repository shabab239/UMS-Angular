import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {Student} from "../model/student.model";
import {StudentService} from "../student.service";
import {ApiResponse} from "../../../util/api.response.model";
import {AlertUtil} from "../../../util/alert.util";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.students = response.data['students'];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadStudents();
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
