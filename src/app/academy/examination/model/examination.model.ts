import { Semester } from "../../semester/model/semester.model";
import {Result} from "../../result/model/result.model";

export class Examination {
  id!: number;
  name!: string;
  date!: Date;
  semester: Semester = new Semester();
  results: Result[] = [];

}
