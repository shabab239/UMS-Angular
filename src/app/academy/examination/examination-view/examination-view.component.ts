import {Component, OnInit} from '@angular/core';
import {Examination} from '../model/examination.model';
import {Result} from '../../result/model/result.model';
import {ExaminationService} from '../examination.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../util/alert.service';
import {AlertUtil} from '../../../util/alert.util';
import {ResultService} from "../../result/result.service";
import {StudentService} from "../../student/student.service";
import {Student} from "../../student/model/student.model";
import {Course} from "../../course/model/course.model";
import {CourseService} from "../../course/course.service";

@Component({
  selector: 'app-examination-view',
  templateUrl: './examination-view.component.html',
  styleUrls: ['./examination-view.component.css']
})
export class ExaminationViewComponent implements OnInit {
  examination: Examination = new Examination();
  results: Result[] = [];
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private examinationService: ExaminationService,
    private resultService: ResultService,
    private studentService: StudentService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    const examId = this.route.snapshot.params['id'];
    if (examId) {
      this.loadExam(examId);
      this.loadStudents(examId);
      this.loadResults(examId);
      this.loadCourses(examId);
    } else {
      this.alertService.error('No exam ID provided.');
      return;
    }
  }

  private loadResults(examId: number): void {
    this.resultService.getAllByExamination(examId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.results = response.data['results'] || [];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  private loadStudents(examId: number): void {
    this.studentService.getAllByExamination(examId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.students = response.data['students'] || [];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  private loadCourses(examId: number): void {
    this.courseService.getAllByExamination(examId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.courses = response.data['courses'] || [];
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  private loadExam(examId: number): void {
    this.examinationService.getById(examId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.examination = response.data['examination'];
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
