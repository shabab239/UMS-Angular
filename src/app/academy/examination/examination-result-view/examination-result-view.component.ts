import {Component, OnInit} from '@angular/core';
import {Result} from "../../result/model/result.model";
import {ExaminationService} from "../examination.service";
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-examination-result-view',
  templateUrl: './examination-result-view.component.html',
  styleUrl: './examination-result-view.component.css'
})
export class ExaminationResultViewComponent implements OnInit {

  results: Result[] = [];

  constructor(
    private examinationService: ExaminationService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const examinationId = this.route.snapshot.params['id'];
    if (examinationId) {
      this.getResultsByExamination(examinationId);
    } else {
      this.alertService.error('No examination ID provided.');
    }
  }

  private getResultsByExamination(examinationId: number): void {
    this.examinationService.getResultsByExamination(examinationId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.results = response.data['results'];
        } else {
          this.alertService.error(response?.message || 'Failed to load results.');
        }
      },
      error: error => {
        this.alertService.error('An error occurred while loading the results.');
      }
    });
  }
}
