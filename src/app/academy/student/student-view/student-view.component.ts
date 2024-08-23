import {Component, OnInit} from '@angular/core';
import {Student} from "../model/student.model";
import {StudentService} from "../student.service";
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.css'
})
export class StudentViewComponent implements OnInit {

  student: Student = new Student();

  constructor(
    private studentService: StudentService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.params['id'];
    if (studentId) {
      this.studentService.getStudent(studentId).subscribe({
        next: response => {
          this.student = Object.assign(new Student(), response);
        },
        error: error => {
          this.alertService.error('An error occurred while loading student.');
        }
      })
    }
  }

}
