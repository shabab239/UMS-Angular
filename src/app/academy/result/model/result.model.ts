import { Examination } from "../../examination/model/examination.model";
import { Student } from "../../student/model/student.model";
import { Course } from "../../course/model/course.model";
import {UserRole} from "../../../admin/user/model/user.model";

export class Result {
  id!: number;
  examination: Examination = new Examination();
  student: Student = new Student();
  course: Course = new Course();
  markMid!: number;
  markAttendance!: number;
  markWritten!: number;
  sessionalType!: SessionalType;
  markSessional!: number;
  grade?: string;
  status?: string;

}

export enum SessionalType {
  PRACTICAL = 'PRACTICAL',
  PRESENTATION = 'PRESENTATION'
}

export const sessionalTypeOptions: { value: string, label: string }[] = [
  { value: SessionalType.PRACTICAL, label: 'Practical' },
  { value: SessionalType.PRESENTATION, label: 'Presentation' }
];
