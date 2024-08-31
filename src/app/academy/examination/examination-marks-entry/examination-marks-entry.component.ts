import {Component, OnInit} from '@angular/core';
import {Examination} from '../model/examination.model';
import {Result, SessionalType, sessionalTypeOptions} from '../../result/model/result.model';
import {ExaminationService} from '../examination.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../util/alert.service';
import {AlertUtil} from '../../../util/alert.util';
import {ResultService} from '../../result/result.service';
import {StudentService} from '../../student/student.service';
import {Student} from '../../student/model/student.model';
import {Course} from '../../course/model/course.model';
import {CourseService} from '../../course/course.service';
import {Mark} from "../model/mark.model";

@Component({
  selector: 'app-examination-view',
  templateUrl: './examination-marks-entry.component.html',
  styleUrls: ['./examination-marks-entry.component.css']
})
export class ExaminationMarksEntryComponent implements OnInit {
  examination: Examination = new Examination();
  marks: Mark[] = [];
  courses: Course[] = [];
  selectedCourse?: Course;

  sessionalTypeOptions = sessionalTypeOptions;
  markErrors: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private examinationService: ExaminationService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const examId = this.route.snapshot.params['id'];
    if (examId) {
      this.loadExamination(examId);
      this.loadCourses(examId);
    } else {
      this.alertService.error('No exam ID provided.');
    }
  }

  private loadExamination(examId: number): void {
    this.examinationService.getById(examId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.examination = response.data['examination'] || [];
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

  protected loadMarks(examinationId: number, course: Event): void {
    const courseId = Number((course.target as HTMLInputElement).value);
    this.selectedCourse = this.courses.find(course => course.id === courseId);
    this.examinationService.getAllMarksByExaminationAndCourse(examinationId, courseId).subscribe({
      next: response => {
        if (response && response.successful) {
          this.marks = response.data['marks'] || [];
          this.markErrors.clear();
        } else {
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  calculateTotals(): void {
    for (const mark of this.marks) {
      mark.totalMark = (mark.markMid || 0) + (mark.markAttendance || 0) + (mark.markWritten || 0) + (mark.markSessional || 0);
    }
  }

  saveMarks(): void {
    const invalidMarks = this.marks.filter(mark => mark.totalMark && mark.totalMark > 100);

    if (invalidMarks.length > 0) {
      invalidMarks.forEach(mark => {
        this.markErrors.set(mark.id, true);
      });
      this.alertService.error('Total marks cannot exceed 100 for any student.');
      return;
    }

    this.examinationService.saveMarks(this.marks).subscribe({
      next: response => {
        if (response && response.successful) {
          AlertUtil.showSuccess(response, this.alertService);
          this.marks = response.data['marks'] || [];
          this.markErrors.clear();
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
