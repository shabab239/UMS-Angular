import { Examination } from '../../examination/model/examination.model';
import { Student } from '../../student/model/student.model';

export class Result {
  id!: number;
  examination: Examination = new Examination();
  student: Student = new Student();
  cgpa?: number;
  grade?: string;
  status?: string;
}
