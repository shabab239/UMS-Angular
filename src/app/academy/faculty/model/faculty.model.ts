import {User} from "../../../admin/user/model/user.model";

export class Faculty {
  id?: number;
  name?: string;
  email?: string;
  contact?: string;
  dean?: User;
}
