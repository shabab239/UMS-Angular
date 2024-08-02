import {Component, OnInit} from '@angular/core';
import {Institute} from "../model/institute.model";
import {InstituteService} from "../institute.service";

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrl: './institute-list.component.css'
})
export class InstituteListComponent implements OnInit {

  pageTitle: string = 'Institute List';
  breadcrumbs: string[] = ['Home', 'Institutes'];

  institutes: Institute[] = [];

  constructor(private instituteService: InstituteService) { //TODO should only be avaialable for high level admins and system engineers

  }

  ngOnInit(): void {
    this.loadInstitutes();
  }

  loadInstitutes(): void {
    this.instituteService.getInstitutes().subscribe({
      next: response => {
        this.institutes = JSON.parse(JSON.stringify(response));
      },
      error: error => {

      }
    });
  }

  editInstitute(instituteId?: number){

  }

  deleteInstitute(instituteId?: number){

  }


}
