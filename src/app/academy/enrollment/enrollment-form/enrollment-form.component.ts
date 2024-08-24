import {Component, OnInit} from '@angular/core';
import {Enrollment} from "../model/enrollment.model";
import {EnrollmentService} from "../enrollment.service";
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../course/model/course.model";
import {CourseService} from "../../course/course.service";
import {StudentService} from "../../student/student.service";

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {

  errors: Map<string, string> = new Map<string, string>();
  enrollment: Enrollment = new Enrollment();
  courses: Course[] = [];
  selectedCourses: number[] = [];

  studentId?: number;
  enrollmentId?: number;

  statusOptions: { value: string, label: string }[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private studentService: StudentService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadOptions();

    this.studentId = this.route.snapshot.params['studentId'];
    this.enrollmentId = this.route.snapshot.params['enrollmentId'];

    if (!this.studentId) {
      this.alertService.error('An error occurred while loading student.');
      return;
    }

    this.studentService.getStudent(this.studentId).subscribe({
      next: response => {
        this.enrollment.student = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading student.');
      }
    })

    if (this.enrollmentId) {
      this.enrollmentService.getEnrollment(this.enrollmentId).subscribe({
        next: response => {
          this.enrollment = Object.assign(new Enrollment(), response);
          this.selectedCourses = this.enrollment.courses
            .map(course => course.id)
            .filter((id): id is number => id !== undefined);
        },
        error: error => {
          this.alertService.error('An error occurred while loading enrollment.');
        }
      });
    }
  }

  private loadCourses() {
    this.courseService.getCourses().subscribe({
      next: response => {
        this.courses = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading courses.');
      }
    });
  }

  private loadOptions() {
    this.statusOptions = [
      {value: 'Pending', label: 'Pending'},
      {value: 'Approved', label: 'Approved'},
      {value: 'Completed', label: 'Completed'},
      {value: 'Cancelled', label: 'Cancelled'}
    ];
  }

  submitEnrollment() {
    this.enrollment.courses = this.selectedCourses
      .map(id => this.courses.find(course => course.id === id))
      .filter(Boolean) as Course[];

    this.enrollment.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    if (!this.enrollmentId) {
      this.enrollmentService.createEnrollment(this.enrollment).subscribe({
        next: () => {
          this.enrollment = new Enrollment();
          this.router.navigate(['/enrollment-list']);
        },
        error: () => {
          this.alertService.error('An error occurred while creating enrollment.');
        }
      });
    } else {
      this.enrollmentService.updateEnrollment(this.enrollment).subscribe({
        next: () => {
          this.enrollment = new Enrollment();
          this.router.navigate(['/enrollment-list']);
        },
        error: () => {
          this.alertService.error('An error occurred while updating enrollment.');
        }
      });
    }
  }
}
