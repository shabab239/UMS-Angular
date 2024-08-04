// header.component.ts
import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from "../../util/breadcrumb.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Array<{ name: string, url: string }> = [];
  pageTitle: string = '';

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      this.pageTitle = breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].name : '';
    });
  }
}
