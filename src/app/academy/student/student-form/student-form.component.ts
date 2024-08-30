import {Component, OnInit} from '@angular/core';
import {Student} from '../model/student.model';
import {StudentService} from '../student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../util/alert.service';
import {ApiResponse} from '../../../util/api.response.model';
import {AlertUtil} from '../../../util/alert.util';
import {Observable} from 'rxjs';
import {SemesterService} from "../../semester/semester.service";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student = new Student();
  studentId?: number;
  avatarFile?: File;

  errors: { [key: string]: string } = {};

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];
  semesterOptions: { value: number, label: string }[] = [];

  constructor(
    private studentService: StudentService,
    private semesterService: SemesterService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadOptions();

    this.studentId = this.route.snapshot.params['id'];
    if (this.studentId) {
      this.studentService.getById(this.studentId).subscribe({
        next: response => {
          if (response && response.successful) {
            this.student = response.data['student'];
            this.student.avatar = undefined;
            console.log(this.student);
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

  onAvatarPicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files[0];
    }
  }

  createOrUpdateStudent(): void {
    const studentObservable: Observable<ApiResponse> = this.studentId
      ? this.studentService.update(this.student, this.avatarFile)
      : this.studentService.create(this.student, this.avatarFile);

    studentObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.student = new Student();
          this.errors = {};
          AlertUtil.showSuccess(response, this.alertService);
          this.router.navigate(['/student-list']);
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

  loadOptions(): void {
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
    })

    // will fetch later from server
    this.genderOptions = [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Other', label: 'Other'}
    ];

    this.statusOptions = [
      {value: 'Active', label: 'Active'},
      {value: 'Inactive', label: 'Inactive'},
      {value: 'Pending', label: 'Pending'},
      {value: 'Suspended', label: 'Suspended'},
      {value: 'Graduated', label: 'Graduated'}
    ];

    this.bloodGroupOptions = [
      {value: 'A+', label: 'A+'},
      {value: 'A-', label: 'A-'},
      {value: 'B+', label: 'B+'},
      {value: 'B-', label: 'B-'},
      {value: 'AB+', label: 'AB+'},
      {value: 'AB-', label: 'AB-'},
      {value: 'O+', label: 'O+'},
      {value: 'O-', label: 'O-'}
    ];
  }
}
