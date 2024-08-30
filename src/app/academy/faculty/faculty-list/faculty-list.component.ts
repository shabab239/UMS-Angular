import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../util/alert.service";
import {ApiResponse} from "../../../util/api.response.model";
import {AlertUtil} from "../../../util/alert.util";
import {Faculty} from "../model/faculty.model";
import {FacultyService} from "../faculty.service";

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.css'
})
export class FacultyListComponent implements OnInit {

  faculties: Faculty[] = [];

  constructor(
    private facultyService: FacultyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.facultyService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.faculties = response.data['faculties'];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  deleteFaculty(id: number): void {
    this.facultyService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadFaculties();
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
