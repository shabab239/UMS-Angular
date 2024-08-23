import { Component } from '@angular/core';
import {Faculty} from "../../faculty/model/faculty.model";
import {FacultyService} from "../../faculty/faculty.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../util/alert.service";

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.css'
})
export class FacultyListComponent {
  faculties: Faculty[] = [];

  constructor(
    private facultyService: FacultyService,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.facultyService.getFaculties().subscribe({
      next: response => {
        this.faculties = response.map(faculty => Object.assign(new Faculty(), faculty));
      },
      error: error => {

      }
    });
  }

  deleteFaculty(id?: number) {
    if (id === undefined || id === null) {
      this.alertService.error('Faculty ID is required.');
      return;
    }

    this.facultyService.deleteFaculty(id).subscribe({
      next: response => {
        this.alertService.success('Faculty deleted successfully!');
        this.loadFaculties();
      },
      error: error => {
        this.alertService.error('Could not delete faculty.');
      }
    })
  }
}
