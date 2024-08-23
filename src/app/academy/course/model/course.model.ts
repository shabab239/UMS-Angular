import {Department} from "../../department/model/department.model";
import {User} from "../../../admin/user/model/user.model";


export class Course {
  id?: number;
  name?: string;
  code?: string;
  credits?: number;
  fees?: number;
  description?: string;
  department!: Department;
  teacher!: User;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.code = undefined;
    this.description = undefined;
    this.credits = undefined;
    this.fees = undefined;
    this.department = new Department();
    this.teacher = new User();
  }

  validate(errors: Map<string, string>) {
    if (!this.name || this.name.trim().length === 0) {
      errors.set('name', 'Course name is required');
    } else {
      errors.delete('name');
    }

    if (!this.code || this.code.trim().length === 0) {
      errors.set('code', 'Course code is required');
    } else {
      errors.delete('code');
    }

    if (!this.description || this.description.trim().length === 0) {
      errors.set('description', 'Course description is required');
    } else {
      errors.delete('description');
    }

    if (this.credits === undefined || this.credits <= 0) {
      errors.set('credits', 'Credits must be a positive number');
    } else {
      errors.delete('credits');
    }

    if (!this.department.id) {
      errors.set('department', 'Department is required');
    } else {
      errors.delete('department');
    }

    if (!this.teacher.id) {
      errors.set('teacher', 'Teacher is required');
    } else {
      errors.delete('teacher');
    }

  }
}
