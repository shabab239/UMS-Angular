import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DashboardService} from "../dashboard.service";
import {AlertService} from "../../util/alert.service";
import {AlertUtil} from "../../util/alert.util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};

  constructor(private dashboardService: DashboardService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.dashboard().subscribe({
      next: (response) => {
        this.dashboardData = response.data.dashboardData;
      },
      error: (error) => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

}
