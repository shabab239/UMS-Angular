export class User {
  public id?: number;
  public type?: string;
  public name?: string;
  public cell?: string;
  public email?: string;
  public gender?: string;
  public address?: string;
  public avatar?: any;
  public status?: string;
  public dateOfBirth?: string;
  public bloodGroup?: string;
  public joiningDate?: string;
  public instituteId?: number;

  errors: { [key: string]: string } = {};

  constructor() {}
}
