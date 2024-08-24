import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";
import {Student} from "../model/student.model";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: response => {
        this.students = response.map(student => Object.assign(new Student(), student));
      },
      error: error => {
        this.alertService.error('Could not load students.');
      }
    });
  }

  deleteStudent(id?: number) {
    if (id === undefined || id === null) {
      this.alertService.error('Student ID is required.');
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: response => {
        this.alertService.success('Student deleted successfully!');
        this.loadStudents();
      },
      error: error => {
        this.alertService.error('Could not delete student.');
      }
    })
  }
}
