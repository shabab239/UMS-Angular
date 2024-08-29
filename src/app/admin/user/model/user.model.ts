export class User {
  id!: number;
  name!: string;
  cell!: string;
  status!: string;
  role!: UserRole;

  // Optional fields
  email?: string;
  gender?: string;
  address?: string;
  avatar?: string;
  dateOfBirth?: Date;
  bloodGroup?: string;
  joiningDate?: Date;
  username?: string;
  password?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

}

export enum UserRole {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_TEACHER = 'ROLE_TEACHER',
  ROLE_STAFF = 'ROLE_STAFF',
}
