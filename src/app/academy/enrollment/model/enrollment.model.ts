import {Student} from "../../student/model/student.model";
import {Course} from "../../course/model/course.model";


export class Enrollment {
  id?: number;
  enrollmentDate?: string;
  feesPaid?: number;
  status?: string;
  student!: Student;
  course!: Course;

  constructor() {
    this.id = undefined;
    this.enrollmentDate = undefined;
    this.feesPaid = undefined;
    this.status = undefined;
    this.student = new Student();
    this.course = new Course();
  }

  validate(errors: Map<string, string>) {

    if (!this.student.id) {
      errors.set('student', 'Student is required');
    } else {
      errors.delete('student');
    }

    if (!this.course.id) {
      errors.set('course', 'Course is required');
    } else {
      errors.delete('course');
    }

    if (this.feesPaid === undefined || this.feesPaid < 0) {
      errors.set('fees', 'Fees must be a non-negative number');
    } else {
      errors.delete('fees');
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
