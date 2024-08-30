import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SemesterService} from '../semester.service';
import {AlertService} from "../../../util/alert.service";
import {AlertUtil} from "../../../util/alert.util";
import {ApiResponse} from "../../../util/api.response.model";
import {Semester} from '../model/semester.model';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent implements OnInit {
  semesters: Semester[] = [];
  errors: { [key: string]: string } = {};

  searchTerm: string = '';

  constructor(
    private semesterService: SemesterService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadSemesters();
  }

  loadSemesters(): void {
    this.semesterService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.semesters = response.data['semesters'];
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

  filteredSemesters() {
    if (!this.searchTerm) {
      return this.semesters;
    }
    return this.semesters.filter(semester =>
      semester.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      semester.session.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      semester.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      semester.program.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteSemester(id: number): void {
    this.semesterService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadSemesters();
          AlertUtil.showSuccess(response, this.alertService);
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
