import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../model/program.model';
import { ProgramService } from '../program.service';
import { DepartmentService } from '../../department/department.service';
import { AlertService } from "../../../util/alert.service";
import { AlertUtil } from "../../../util/alert.util";
import { ApiResponse } from "../../../util/api.response.model";
import { Department } from '../../department/model/department.model';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {
  program: Program = new Program();
  programId?: number;

  errors: { [key: string]: string } = {};
  departmentOptions: Department[] = [];

  constructor(
    private programService: ProgramService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();

    this.programId = this.route.snapshot.params['id'];
    if (this.programId) {
      this.programService.getById(this.programId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.program = response.data['program'];
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

  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.departmentOptions = response.data['departments'];
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

  createOrUpdateProgram(): void {
    const programObservable = this.programId
      ? this.programService.update(this.program)
      : this.programService.create(this.program);

    programObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.program = new Program();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/program-list']);
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
