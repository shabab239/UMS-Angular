export class User {
  constructor(
    public id?: number,
    public type?: string,
    public firstName?: string,
    public lastName?: string,
    public cell?: string,
    public email?: string,
    public gender?: string,
    public address?: string,
    public status?: string,
    public dateOfBirth?: string,
    public bloodGroup?: string,
    public joiningDate?: string,
    public avatar?: string,
    public instituteId?: number
  ) {
  }

  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }


}
