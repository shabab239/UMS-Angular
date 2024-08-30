import {Program} from "../../program/model/program.model";


export class Semester {
  id!: number;

  name!: string;
  session!: string;
  code!: string;
  program: Program = new Program();

}
