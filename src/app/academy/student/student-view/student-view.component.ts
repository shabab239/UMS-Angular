import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute} from "@angular/router";
import {Student} from "../model/student.model";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.css'
})
export class StudentViewComponent implements OnInit{
  student?: Student;

  constructor(
    private studentService: StudentService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.params['id'];
    if (studentId) {
      this.loadStudent(studentId);
    } else {
      this.alertService.error('No student ID provided.');
    }
  }

  private loadStudent(studentId: number): void {
    this.studentService.getById(studentId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.student = response.data['student'];
        } else {
          this.alertService.error(response?.message || 'Failed to load student data.');
        }
      },
      error: error => {
        this.alertService.error('An error occurred while loading the student.');
      }
    });
  }
}
