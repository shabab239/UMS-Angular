import {Department} from "../../department/model/department.model";

export class Program {
  id?: number;

  name!: string;
  durationYear!: number;
  department!: Department;

}
