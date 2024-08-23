import {User} from "../../../admin/user/model/user.model";
import {Faculty} from "../../faculty/model/faculty.model";

export class Department {
  id?: number;
  name?: string;
  head!: User;
  faculty!: Faculty;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.head = new User();
    this.faculty = new Faculty();
  }

  validate(errors: Map<string, string>) {
    if (!this.name || this.name.trim().length === 0) {
      errors.set('name', 'Name is required');
    } else {
      errors.delete('name');
    }

    if (!this.head.id) {
      errors.set('head', 'Head of department is required');
    } else {
      errors.delete('head');
    }

    if (!this.faculty.id) {
      errors.set('faculty', 'Faculty is required');
    } else {
      errors.delete('faculty');
    }
  }

}
