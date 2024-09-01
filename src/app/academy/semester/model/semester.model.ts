import {Program} from "../../program/model/program.model";
import {Fee} from "../../fee/model/fee.model";


export class Semester {
  id!: number;

  name!: string;
  session!: string;
  code!: string;
  program: Program = new Program();
  fees: Fee[] = [];

}
