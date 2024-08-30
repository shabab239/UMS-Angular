import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { AlertService } from "../../../util/alert.service";
import { AlertUtil } from "../../../util/alert.util";
import { ApiResponse } from "../../../util/api.response.model";
import { Course } from '../model/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  errors: { [key: string]: string } = {};

  searchTerm: string = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.courses = response.data['courses'];
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

  filteredCourses() {
    if (!this.searchTerm) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.semester.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.teachers.some(teacher =>
        teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  deleteCourse(id: number): void {
    this.courseService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadCourses();
          AlertUtil.showSuccess(response, this.alertService);
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
