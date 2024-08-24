import {Student} from "../../student/model/student.model";
import {Course} from "../../course/model/course.model";


export class Enrollment {
  id?: number;
  enrollmentDate?: string;
  feesPaid?: number;
  status?: string;
  student!: Student;
  courses!: Course[];

  constructor() {
    this.id = undefined;
    this.enrollmentDate = undefined;
    this.feesPaid = undefined;
    this.status = undefined;
    this.student = new Student();
    this.courses = [];
  }

  getCoursesNames(): string {
    return this.courses.map(course => course.name).join(', ');
  }

  getTotalFees(): number {
    return this.courses.reduce((total, course) => total + (course.fee || 0), 0);
  }

  validate(errors: Map<string, string>) {

    if (!this.student.id) {
      errors.set('student', 'Student is required');
    } else {
      errors.delete('student');
    }

    if (this.courses.length < 1) {
      errors.set('courses', 'Course is required');
    } else {
      errors.delete('courses');
    }

    if (this.feesPaid === undefined || this.feesPaid < 0) {
      errors.set('feesPaid', 'Fees is required');
    } else {
      errors.delete('feesPaid');
    }

    if (!this.enrollmentDate || this.enrollmentDate.trim().length === 0) {
      errors.set('enrollmentDate', 'Enrollment date is required');
    } else {
      errors.delete('enrollmentDate');
    }

    if (!this.status || this.status.trim().length === 0) {
      errors.set('status', 'Status is required');
    } else {
      errors.delete('status');
    }
  }
}
