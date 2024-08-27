import {User} from "../../admin/user/model/user.model";

export class Token {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public user?: User
  ) {
  }

}
