import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../model/course.model';
import { SemesterService } from '../../semester/semester.service';
import { UserService } from '../../../admin/user/user.service';
import { CourseService } from '../course.service';
import { AlertService } from '../../../util/alert.service';
import { AlertUtil } from '../../../util/alert.util';
import { ApiResponse } from '../../../util/api.response.model';
import { Semester } from '../../semester/model/semester.model';
import { User } from '../../../admin/user/model/user.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  course: Course = new Course();
  courseId?: number;

  errors: { [key: string]: string } = {};
  semesterOptions: { value: number, label: string }[] = [];
  teacherOptions: User[] = [];

  constructor(
    private courseService: CourseService,
    private semesterService: SemesterService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadSemestersAndTeachers();

    this.courseId = this.route.snapshot.params['id'];
    if (this.courseId) {
      this.courseService.getById(this.courseId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.course = response.data['course'];
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

  loadSemestersAndTeachers(): void {
    this.semesterService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.semesterOptions = response.data['semesters'].map((semester: any) => ({
            value: semester.id,
            label: semester.name + " (" + semester.session + ")"
          }));;
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });

    this.userService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.teacherOptions = response.data['users'];
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  createOrUpdateCourse(): void {
    const courseObservable = this.courseId
      ? this.courseService.update(this.course)
      : this.courseService.create(this.course);

    courseObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.course = new Course();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/course-list']);
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }
}
