import { Department } from "../../department/model/department.model";
import { Enrollment } from "../../enrollment/model/enrollment.model";

export class Student {
  id?: number;
  idNo?: number;
  name?: string;
  email?: string;
  cell?: string;
  gender?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  religion?: string;
  avatar?: any;
  fatherName?: string;
  fatherCell?: string;
  motherName?: string;
  motherCell?: string;
  presentAddress?: string;
  permanentAddress?: string;
  admissionDate?: string;
  session?: string;
  status?: string;
  department: Department = new Department();
  enrollments!: Enrollment[];

  validate(errors: Map<string, string>) {
    if (!this.idNo || this.idNo < 0) {
      errors.set('idNo', 'ID Number is required');
    } else {
      errors.delete('idNo');
    }

    if (!this.name || this.name.trim().length === 0) {
      errors.set('name', 'Name is required');
    } else {
      errors.delete('name');
    }

    if (!this.cell || this.cell.trim().length === 0) {
      errors.set('cell', 'Cell number is required');
    } else if (!/^\d{11}$/.test(this.cell)) {
      errors.set('cell', 'Cell number must be 11 digits');
    } else {
      errors.delete('cell');
    }

    if (!this.email || this.email.trim().length === 0) {
      errors.set('email', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.set('email', 'Invalid email format');
    } else {
      errors.delete('email');
    }

    if (!this.department.id) {
      errors.set('department', 'Department is required');
    } else {
      errors.delete('department');
    }

    if (!this.gender || this.gender.trim().length === 0) {
      errors.set('gender', 'Gender is required');
    } else {
      errors.delete('gender');
    }

    if (!this.dateOfBirth || this.dateOfBirth.trim().length === 0) {
      errors.set('dateOfBirth', 'Date Of Birth is required');
    } else {
      errors.delete('dateOfBirth');
    }

    if (!this.admissionDate || this.admissionDate.trim().length === 0) {
      errors.set('admissionDate', 'Admission date is required');
    } else {
      errors.delete('admissionDate');
    }

    if (!this.session || this.session.trim().length === 0) {
      errors.set('session', 'Session is required');
    } else {
      errors.delete('session');
    }

    if (!this.status || this.status.trim().length === 0) {
      errors.set('status', 'Status is required');
    } else {
      errors.delete('status');
    }
  }

}
