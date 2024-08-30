import {User} from "../../../admin/user/model/user.model";
import {Faculty} from "../../faculty/model/faculty.model";


export class Department {
  id!: number;

  name!: string;
  head: User = new User();
  faculty: Faculty = new Faculty();

}
