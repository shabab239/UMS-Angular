import {Semester} from "../../semester/model/semester.model";

export class Student {
  id!: number;

  idNo!: string;
  name!: string;
  email!: string;
  cell!: string;
  admissionDate!: Date;
  status!: string;
  semester: Semester = new Semester();

  /* Optional */
  gender?: string;
  dateOfBirth?: Date;
  bloodGroup?: string;
  religion?: string;
  avatar?: string;
  fatherName?: string;
  fatherCell?: string;
  motherName?: string;
  motherCell?: string;
  presentAddress?: string;
  permanentAddress?: string;
}
