import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course.model";
import {CourseService} from "../course.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: response => {
        this.courses = response.map(course => Object.assign(new Course(), course));
      },
      error: error => {
        this.alertService.error('Could not load courses.');
      }
    });
  }

  deleteCourse(id?: number) {
    if (id === undefined || id === null) {
      this.alertService.error('Course ID is required.');
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: response => {
        this.alertService.success('Course deleted successfully!');
        this.loadCourses();
      },
      error: error => {
        this.alertService.error('Could not delete course.');
      }
    })
  }
}
