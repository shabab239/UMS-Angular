import {Semester} from '../../semester/model/semester.model';

export class Fee {
  id!: number;
  type!: FeeType;
  amount!: number;
  semester: Semester = new Semester();
}

export enum FeeType {
  SEMESTER = 'SEMESTER',
  HALL = 'HALL'
}

export const FeeTypeOptions: { value: string, label: string }[] = [
  {value: FeeType.SEMESTER, label: 'Semester'},
  {value: FeeType.HALL, label: 'Hall'}
];
