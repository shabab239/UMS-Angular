import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstituteListComponent} from "./admin/institute/institute-list/institute-list.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./template/page-not-found/page-not-found.component";
import {InstituteCreateComponent} from "./admin/institute/institute-create/institute-create.component";
import {InstituteViewComponent} from "./admin/institute/institute-view/institute-view.component";
import {UserListComponent} from "./admin/user/user-list/user-list.component";
import {LoginComponent} from "./security/login/login.component";
import {UserFormComponent} from "./admin/user/user-form/user-form.component";
import {UserViewComponent} from "./admin/user/user-view/user-view.component";
import {BreadcrumbService} from "./util/breadcrumb.service";
import {AuthGuard} from "./security/auth/guard/auth.guard";
import {StudentListComponent} from "./academy/student/student-list/student-list.component";
import {StudentViewComponent} from "./academy/student/student-view/student-view.component";
import {StudentFormComponent} from "./academy/student/student-form/student-form.component";
import {FacultyListComponent} from "./academy/faculty/faculty-list/faculty-list.component";
import {FacultyFormComponent} from "./academy/faculty/faculty-form/faculty-form.component";
import {DepartmentFormComponent} from "./academy/department/department-form/department-form.component";
import {DepartmentListComponent} from "./academy/department/department-list/department-list.component";
import {ProgramListComponent} from "./academy/program/program-list/program-list.component";
import {ProgramFormComponent} from "./academy/program/program-form/program-form.component";
import {SemesterListComponent} from "./academy/semester/semester-list/semester-list.component";
import {SemesterFormComponent} from "./academy/semester/semester-form/semester-form.component";
import {CourseFormComponent} from "./academy/course/course-form/course-form.component";
import {CourseListComponent} from "./academy/course/course-list/course-list.component";
import {ExaminationFormComponent} from "./academy/examination/examination-form/examination-form.component";
import {ExaminationListComponent} from "./academy/examination/examination-list/examination-list.component";
import {ExaminationMarksEntryComponent} from "./academy/examination/examination-marks-entry/examination-marks-entry.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Dashboard", breadcrumbs: ["Dashboard"]},
    children: []
  },
  {
    path: 'institute-list',
    component: InstituteListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Institute List", breadcrumbs: ["Institute List"]}
  },
  {
    path: 'institute-create',
    component: InstituteCreateComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Institute", breadcrumbs: ["Create Institute"]}
  },
  {
    path: 'institute-view',
    component: InstituteViewComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "View Institute", breadcrumbs: ["View Institute"]}
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "User List", breadcrumbs: ["User List"]}
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create User", breadcrumbs: ["User List", "Create User"]}
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update User", breadcrumbs: ["User List", "Update User"]}
  },
  {
    path: 'user-view/:id',
    component: UserViewComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "View User", breadcrumbs: ["User List", "View User"]}
  },
  {
    path: 'department-list',
    component: DepartmentListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Department List", breadcrumbs: ["Department List"]}
  },
  {
    path: 'department-form',
    component: DepartmentFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Department", breadcrumbs: ["Department List", "Create Department"]}
  },
  {
    path: 'department-form/:id',
    component: DepartmentFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Department", breadcrumbs: ["Department List", "Update Department"]}
  },
  {
    path: 'faculty-list',
    component: FacultyListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Faculty List", breadcrumbs: ["Faculty List"]}
  },
  {
    path: 'faculty-form',
    component: FacultyFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Faculty", breadcrumbs: ["Faculty List", "Create Faculty"]}
  },
  {
    path: 'faculty-form/:id',
    component: FacultyFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Faculty", breadcrumbs: ["Faculty List", "Update Faculty"]}
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Student List", breadcrumbs: ["Student List"]}
  },
  {
    path: 'student-form',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Student", breadcrumbs: ["Student List", "Create Student"]}
  },
  {
    path: 'student-form/:id',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Student", breadcrumbs: ["Student List", "Update Student"]}
  },
  {
    path: 'student-view/:id',
    component: StudentViewComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "View Student", breadcrumbs: ["Student List", "View Student"]}
  },
  {
    path: 'program-list',
    component: ProgramListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Program List", breadcrumbs: ["Program List"]}
  },
  {
    path: 'program-form',
    component: ProgramFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Program", breadcrumbs: ["Program List", "Create Program"]}
  },
  {
    path: 'program-form/:id',
    component: ProgramFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Program", breadcrumbs: ["Program List", "Update Program"]}
  },
  {
    path: 'semester-list',
    component: SemesterListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Semester List", breadcrumbs: ["Semester List"]}
  },
  {
    path: 'semester-form',
    component: SemesterFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Semester", breadcrumbs: ["Semester List", "Create Semester"]}
  },
  {
    path: 'semester-form/:id',
    component: SemesterFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Semester", breadcrumbs: ["Semester List", "Update Semester"]}
  },
  {
    path: 'course-list',
    component: CourseListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Course List", breadcrumbs: ["Course List"]}
  },
  {
    path: 'course-form',
    component: CourseFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Course", breadcrumbs: ["Course List", "Create Course"]}
  },
  {
    path: 'course-form/:id',
    component: CourseFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Course", breadcrumbs: ["Course List", "Update Course"]}
  },
  {
    path: 'examination-list',
    component: ExaminationListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Examination List", breadcrumbs: ["Examination List"]}
  },
  {
    path: 'examination-form',
    component: ExaminationFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Examination", breadcrumbs: ["Examination List", "Create Examination"]}
  },
  {
    path: 'examination-form/:id',
    component: ExaminationFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Examination", breadcrumbs: ["Examination List", "Update Examination"]}
  },
  {
    path: 'examination-marks-entry/:id',
    component: ExaminationMarksEntryComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Marks Entry", breadcrumbs: ["Examination List", "Marks Entry"]}
  },

  {path: '**', component: PageNotFoundComponent}, // This has to be at the end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BreadcrumbService]
})
export class AppRoutingModule {
}
