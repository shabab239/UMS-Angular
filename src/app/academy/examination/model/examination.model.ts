import {Semester} from "../../semester/model/semester.model";

export class Examination {
  id!: number;
  name!: string;
  date!: Date;
  semester: Semester = new Semester();
}
