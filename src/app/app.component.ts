// app.component.ts
import {Component, OnInit} from '@angular/core';
import {AuthService} from './security/auth/auth.service';
import {BreadcrumbService} from "./util/breadcrumb.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  protected pageTitle: string = '';

  constructor(
    protected authService: AuthService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.pageTitle.subscribe(title => {
      this.pageTitle = title;
    });
  }

}
