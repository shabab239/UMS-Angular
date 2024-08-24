import {Component, OnInit} from '@angular/core';
import {Enrollment} from "../model/enrollment.model";
import {EnrollmentService} from "../enrollment.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.css'
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe({
      next: response => {
        this.enrollments = response.map(enrollment => Object.assign(new Enrollment(), enrollment));
      },
      error: error => {

      }
    });
  }

  deleteEnrollment(id?: number) {
    if (id === undefined || id === null) {
      this.alertService.error('Enrollment ID is required.');
      return;
    }

    this.enrollmentService.deleteEnrollment(id).subscribe({
      next: response => {
        this.alertService.success('Enrollment deleted successfully!');
        this.loadEnrollments();
      },
      error: error => {
        this.alertService.error('Could not delete enrollment.');
      }
    })
  }
}
