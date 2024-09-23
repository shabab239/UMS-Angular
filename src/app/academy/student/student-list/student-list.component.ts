// src/app/academy/student/student-list/student-list.component.ts
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AlertService} from '../../../util/alert.service';
import {Student} from '../model/student.model';
import {StudentService} from '../student.service';
import {ApiResponse} from '../../../util/api.response.model';
import {AlertUtil} from '../../../util/alert.util';
import {Semester} from '../../semester/model/semester.model';
import {ModalService} from '../../../util/modal.service';
import {FeeService} from "../../fee/fee.service";
import {FeeImposed} from "../../fee/model/fee.imposed.model";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  semesters: Semester[] = [];
  imposedFees: FeeImposed[] = [];
  searchTerm: string = ''; // Search term for filtering students

  @ViewChild('feeModal', {static: true}) feeModal!: TemplateRef<any>;

  constructor(
    private studentService: StudentService,
    private feeService: FeeService,
    private alertService: AlertService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.students = response.data['students'];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentService.delete(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.loadStudents();
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

  openFeeModal(studentId: number): void {
    this.feeService.getImposedFees(studentId).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.imposedFees = response.data['imposedFees'];
          console.log(this.imposedFees);
          this.modalService.open(this.feeModal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
            this.collectFees();
          }, () => {
            // Handle dismissal
          });
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  collectFees(): void {
    this.feeService.collectFees(this.imposedFees).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
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

  filteredStudents(): Student[] {
    if (!this.searchTerm) {
      return this.students;
    }
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.semester.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.semester.session.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
