import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course.model";
import {Department} from "../../department/model/department.model";
import {CourseService} from "../course.service";
import {DepartmentService} from "../../department/department.service";
import {UserService} from "../../../admin/user/user.service";
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../admin/user/model/user.model";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {

  errors: Map<string, string> = new Map<string, string>();

  course: Course = new Course();
  departments?: Department[];
  teachers: User[] = [];
  selectedCourseTeachers: number[] = [];

  courseId?: number;

  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadTeachers();

    this.courseId = this.route.snapshot.params['id'];
    if (this.courseId) {
      this.courseService.getCourse(this.courseId).subscribe({
        next: response => {
          this.course = Object.assign(new Course(), response);
          this.selectedCourseTeachers = this.course.teachers.map(teacher => teacher.id);
        },
        error: error => {
          this.alertService.error('An error occurred while loading course.');
        }
      })
    }
  }

  private loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: response => {
        this.departments = response;
      },
      error: error => {
        console.log(error)
        this.alertService.error('An error occurred while loading departments.');
      }
    })
  }

  private loadTeachers() {
    this.userService.getUsers().subscribe({
      next: response => {
        this.teachers = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading teachers.');
      }
    })
  }

  protected submitCourse() {

    this.course.teachers = this.selectedCourseTeachers
      .map(id => this.teachers.find(teacher => teacher.id === id))
      .filter(Boolean) as User[];

    this.course.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    const selectedDepartment = this.departments?.find(dept => dept.id === this.course.department.id);
    if (selectedDepartment) {
      this.course.department = selectedDepartment;
    }

    if (!this.courseId) {
      this.courseService.createCourse(this.course).subscribe({
        next: response => {
          this.course = new Course();
          this.router.navigate(['/course-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while creating course.');
        }
      });
    } else {
      this.courseService.updateCourse(this.course).subscribe({
        next: response => {
          this.course = new Course();
          this.router.navigate(['/course-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while updating course.');
        }
      });
    }


  }
}
