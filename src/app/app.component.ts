// app.component.ts
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './security/auth/auth.service';
import {BreadcrumbService} from "./util/breadcrumb.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @Input() buttonText: string | undefined;
  @Input() buttonRoute: string | undefined;

  constructor(
    protected authService: AuthService,
    protected breadcrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
