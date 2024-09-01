import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../security/auth/auth.service";
import {UserRole} from "../../admin/user/model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  protected readonly UserRole = UserRole;

  constructor(
    protected authService: AuthService,
    protected userRole: UserRole,
  ) {
  }

  ngOnInit(): void {
  }

}
