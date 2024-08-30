import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../program.service';
import {AlertService} from "../../../util/alert.service";
import {AlertUtil} from "../../../util/alert.util";
import {ApiResponse} from "../../../util/api.response.model";
import {Program} from '../model/program.model';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  programs: Program[] = [];
  errors: { [key: string]: string } = {};

  constructor(
    private programService: ProgramService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.programs = response.data['programs'];
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

  deleteProgram(id: number): void {
    this.programService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadPrograms();
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
