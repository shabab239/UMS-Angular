import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SemesterService} from '../semester.service';
import {AlertService} from "../../../util/alert.service";
import {AlertUtil} from "../../../util/alert.util";
import {ApiResponse} from "../../../util/api.response.model";
import {Semester} from '../model/semester.model';
import {Fee, FeeTypeOptions} from "../../fee/model/fee.model";
import {ModalService} from "../../../util/modal.service";
import {FeeService} from "../../fee/fee.service";

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent implements OnInit {
  semesters: Semester[] = [];
  errors: { [key: string]: string } = {};

  searchTerm: string = '';
  groupedSemesters: { [key: string]: Semester[] } = {};

  feeTypeOptions = FeeTypeOptions;
  fees: Fee[] = [];
  @ViewChild('feeModal', {static: true}) feeModal!: TemplateRef<any>;

  constructor(
    private semesterService: SemesterService,
    private feeService: FeeService,
    private router: Router,
    private alertService: AlertService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadSemesters();
  }

  addFee(): void {
    this.fees.push(new Fee());
  }

  removeFee(index: number): void {
    this.fees.splice(index, 1);
  }

  openFeeModal(semester: Semester): void {
    this.fees = semester.fees ? [...semester.fees] : [];
    this.modalService.open(this.feeModal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.saveFees(semester.id);
    }, () => {
      // Handle dismissal
    });
  }


  saveFees(semesterId: number): void {
    this.fees.forEach(fee => {
      let semester = new Semester();
      semester.id = semesterId;
      fee.semester = semester;
    })
    this.feeService.saveFees(semesterId, this.fees).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          AlertUtil.showSuccess(response, this.alertService);
          this.modalService.dismiss();
          this.loadSemesters();
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

  loadSemesters(): void {
    this.semesterService.getAll().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.semesters = response.data['semesters'];
          this.sortAndGroupSemesters();
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

  sortAndGroupSemesters(): void {
    this.semesters.sort((a, b) => a.session.localeCompare(b.session));

    this.groupedSemesters = this.semesters.reduce((acc, semester) => {
      const session = semester.session;
      if (!acc[session]) {
        acc[session] = [];
      }
      acc[session].push(semester);
      return acc;
    }, {} as { [key: string]: Semester[] });
  }

  filteredSemesters() {
    if (!this.searchTerm) {
      return this.groupedSemesters;
    }
    const filtered = Object.keys(this.groupedSemesters).reduce((acc, session) => {
      acc[session] = this.groupedSemesters[session].filter(semester =>
        semester.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        semester.session.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        semester.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        semester.program.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      return acc;
    }, {} as { [key: string]: Semester[] });

    return filtered;
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
