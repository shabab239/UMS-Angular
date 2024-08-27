import {User} from "../../../admin/user/model/user.model";

export class Faculty {
  id?: number;
  name?: string;
  email?: string;
  contact?: string;
  dean!: User;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.email = undefined;
    this.contact = undefined;
    //this.dean = new User();
  }

  validate(errors: Map<string, string>) {
    if (!this.name || this.name.trim().length === 0) {
      errors.set('name', 'Name is required');
    } else {
      errors.delete('name');
    }

    if (!this.contact || this.contact.trim().length === 0) {
      errors.set('contact', 'Cell number is required');
    } else if (!/^\d{11}$/.test(this.contact)) {
      errors.set('contact', 'Cell number must be 11 digits');
    } else {
      errors.delete('contact');
    }

    if (!this.email || this.email.trim().length === 0) {
      errors.set('email', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.set('email', 'Invalid email format');
    } else {
      errors.delete('email');
    }

    if (!this.dean.id) {
      errors.set('dean', 'Dean of faculty is required');
    } else {
      errors.delete('dean');
    }
  }

}
