import { Component, OnInit } from '@angular/core';
import { ExaminationService } from '../examination.service';
import { Examination } from '../model/examination.model';
import { AlertService } from '../../../util/alert.service';
import { AlertUtil } from '../../../util/alert.util';
import { ApiResponse } from '../../../util/api.response.model';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.css']
})
export class ExaminationListComponent implements OnInit {
  examinations: Examination[] = [];
  errors: { [key: string]: string } = {};

  constructor(
    private examinationService: ExaminationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadExaminations();
  }

  loadExaminations(): void {
    this.examinationService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.examinations = response.data['examinations'];
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  deleteExamination(id: number): void {
    this.examinationService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.examinations = this.examinations.filter(exam => exam.id !== id);
          AlertUtil.showSuccess(response, this.alertService);
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }
}
