import {User} from "../../../admin/user/model/user.model";

export class Faculty {
  id?: number;

  name!: string;
  dean?: User;

  /* Optional fields */
  email?: string;
  contact?: string;
}
