import {Component, OnInit} from '@angular/core';
import {Student} from "../../student/model/student.model";
import {StudentService} from "../../student/student.service";
import {UserService} from "../../../admin/user/user.service";
import {AlertService} from "../../../util/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Department} from "../../department/model/department.model";
import {Enrollment} from "../../enrollment/model/enrollment.model";
import {DepartmentService} from "../../department/department.service";
import {FileUtils} from "../../../util/file.util";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

  errors: Map<string, string> = new Map<string, string>();

  student: Student = new Student();
  departments?: Department[];
  enrollments?: Enrollment[];

  studentId?: number;

  genderOptions: { value: string, label: string }[] = [];
  statusOptions: { value: string, label: string }[] = [];
  bloodGroupOptions: { value: string, label: string }[] = [];
  religionOptions: { value: string, label: string }[] = [];
  sessionOptions: { value: string, label: string }[] = [];

  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadOptions();

    this.studentId = this.route.snapshot.params['id'];
    if (this.studentId) {
      this.studentService.getStudent(this.studentId).subscribe({
        next: response => {
          this.student = Object.assign(new Student(), response);
        },
        error: error => {
          this.alertService.error('An error occurred while loading student.');
        }
      })
    }
  }

  private loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: response => {
        this.departments = response;
      },
      error: error => {
        this.alertService.error('An error occurred while loading departments.');
      }
    })
  }

  loadOptions() {
    this.genderOptions = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' }
    ];

    this.statusOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Suspended', label: 'Suspended' },
      { value: 'Archived', label: 'Archived' }
    ];

    this.bloodGroupOptions = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' }
    ];

    this.religionOptions = [
      { value: 'Islam', label: 'Islam' },
      { value: 'Christianity', label: 'Christianity' },
      { value: 'Hinduism', label: 'Hinduism' },
      { value: 'Buddhism', label: 'Buddhism' },
      { value: 'Other', label: 'Other' }
    ];

    this.sessionOptions = [
      { value: '2021-2022', label: '2021-2022' },
      { value: '2022-2023', label: '2022-2023' },
      { value: '2023-2024', label: '2023-2024' },
      { value: '2024-2025', label: '2024-2025' }
    ];
  }

  onAvatarPicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.student.avatar = input.files[0];
    }
  }


  protected async submitStudent() {

    this.student.validate(this.errors);

    if (this.errors.size > 0) {
      return;
    }

    this.student.avatar = undefined;
    /*if (this.student.avatar instanceof File) {
      try {
        this.student.avatar = await FileUtils.convertFileToBase64(this.student.avatar);
      } catch (error) {
        this.alertService.error('An error occurred while processing the avatar.');
        return;
      }
    }*/

    const selectedDepartment = this.departments?.find(dept => dept.id === this.student.department.id);
    if (selectedDepartment) {
      this.student.department = selectedDepartment;
    }

    if (!this.studentId) {
      this.studentService.createStudent(this.student).subscribe({
        next: response => {
          this.student = new Student();
          this.router.navigate(['/student-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while creating student.');
        }
      });
    } else {
      this.studentService.updateStudent(this.student).subscribe({
        next: response => {
          this.student = new Student();
          this.router.navigate(['/student-list']);
        },
        error: error => {
          this.alertService.error('An error occurred while updating student.');
        }
      });
    }


  }

}
