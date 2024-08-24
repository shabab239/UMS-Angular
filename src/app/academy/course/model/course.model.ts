import {Department} from "../../department/model/department.model";
import {User} from "../../../admin/user/model/user.model";


export class Course {
  id?: number;
  name?: string;
  code?: string;
  credits?: number;
  fee?: number;
  description?: string;
  department!: Department;
  teachers!: User[];

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.code = undefined;
    this.description = undefined;
    this.credits = undefined;
    this.fee = undefined;
    this.department = new Department();
    this.teachers = [];
  }

  getTeachersNames(): string {
    return this.teachers.map(teacher => teacher.name).join(', ');
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

    if (!this.fee || this.fee < 0) {
      errors.set('fee', 'Course fee is required');
    } else {
      errors.delete('fee');
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

    if (this.teachers.length < 1) {
      errors.set('teachers', 'At least one teacher is required');
    } else {
      errors.delete('teachers');
    }

  }
}
