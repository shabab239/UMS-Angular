import {Semester} from "../../semester/model/semester.model";
import {User} from "../../../admin/user/model/user.model";


export class Course {
  id!: number;

  name!: string;
  code!: string;
  credit!: number;
  semester: Semester = new Semester();

  teachers: User[] = [];

  /* Optional */
  description?: string;
}
