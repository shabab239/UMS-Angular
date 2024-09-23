import {Fee} from "./fee.model";

export class FeeImposed {
  id!: number;
  amount!: number;
  fee: Fee = new Fee();
  //student: Student;
}
