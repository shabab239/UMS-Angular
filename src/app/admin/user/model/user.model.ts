export class User {
  public id!: number;
  public type?: string;
  public name?: string;
  public cell?: string;
  public email?: string;
  public gender?: string;
  public address?: string;
  public avatar?: any;
  public status?: string;
  public dateOfBirth?: string;
  public bloodGroup?: string;
  public joiningDate?: string;
  public instituteId?: number;

  constructor() {}

  validate(errors: Map<string, string>) {
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

    if (!this.gender || this.gender.trim().length === 0) {
      errors.set('gender', 'Gender is required');
    } else {
      errors.delete('gender');
    }

    if (!this.status || this.status.trim().length === 0) {
      errors.set('status', 'Status is required');
    } else {
      errors.delete('status');
    }
  }
}
