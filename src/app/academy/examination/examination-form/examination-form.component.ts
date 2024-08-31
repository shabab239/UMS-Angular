import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Examination} from '../model/examination.model';
import {ExaminationService} from '../examination.service';
import {SemesterService} from '../../semester/semester.service';
import {AlertService} from '../../../util/alert.service';
import {AlertUtil} from '../../../util/alert.util';
import {ApiResponse} from '../../../util/api.response.model';
import {Semester} from '../../semester/model/semester.model';

@Component({
  selector: 'app-examination-form',
  templateUrl: './examination-form.component.html',
  styleUrls: ['./examination-form.component.css']
})
export class ExaminationFormComponent implements OnInit {
  examination: Examination = new Examination();
  examinationId?: number;
  errors: { [key: string]: string } = {};
  semesterOptions: { value: number, label: string }[] = [];

  constructor(
    private examinationService: ExaminationService,
    private semesterService: SemesterService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadSemesters();

    this.examinationId = this.route.snapshot.params['id'];
    if (this.examinationId) {
      this.examinationService.getById(this.examinationId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.examination = response.data['examination'];
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

  loadSemesters(): void {
    this.semesterService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.semesterOptions = response.data['semesters'].map((semester: any) => ({
            value: semester.id,
            label: semester.name + " (" + semester.session + ")"
          }));
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

  createOrUpdateExamination(): void {
    const examinationObservable = this.examinationId
      ? this.examinationService.update(this.examination)
      : this.examinationService.create(this.examination);

    examinationObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.examination = new Examination();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/examination-list']);
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
}
