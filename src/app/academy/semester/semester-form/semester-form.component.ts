import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Semester } from '../model/semester.model';
import { SemesterService } from '../semester.service';
import { ProgramService } from '../../program/program.service';
import { AlertService } from "../../../util/alert.service";
import { AlertUtil } from "../../../util/alert.util";
import { ApiResponse } from "../../../util/api.response.model";
import { Program } from '../../program/model/program.model';

@Component({
  selector: 'app-semester-form',
  templateUrl: './semester-form.component.html',
  styleUrls: ['./semester-form.component.css']
})
export class SemesterFormComponent implements OnInit {
  semester: Semester = new Semester();
  semesterId?: number;

  errors: { [key: string]: string } = {};
  programOptions: Program[] = [];

  constructor(
    private semesterService: SemesterService,
    private programService: ProgramService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadPrograms();

    this.semesterId = this.route.snapshot.params['id'];
    if (this.semesterId) {
      this.semesterService.getById(this.semesterId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.semester = response.data['semester'];
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

  loadPrograms(): void {
    this.programService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.programOptions = response.data['programs'];
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

  createOrUpdateSemester(): void {
    const semesterObservable = this.semesterId
      ? this.semesterService.update(this.semester)
      : this.semesterService.create(this.semester);

    semesterObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.semester = new Semester();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/semester-list']);
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
