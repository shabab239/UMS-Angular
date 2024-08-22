import {Component, OnInit} from '@angular/core';
import {Faculty} from "../model/faculty.model";
import {UserService} from "../../../admin/user/user.service";
import {AuthService} from "../../../security/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FacultyService} from "../faculty.service";

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrl: './faculty-create.component.css'
})
export class FacultyCreateComponent implements OnInit {

  faculty: Faculty = new Faculty();

  constructor(
    private facultyService: FacultyService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

}
