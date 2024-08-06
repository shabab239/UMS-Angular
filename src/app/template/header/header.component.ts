// header.component.ts
import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../util/breadcrumb.service";
import {AuthService} from "../../security/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Array<{ name: string, url: string }> = [];
  pageTitle: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      this.pageTitle = breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].name : '';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
