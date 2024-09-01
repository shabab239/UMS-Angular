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
import {RoleGuard} from "./security/auth/guard/role.guard";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Dashboard", breadcrumbs: ["Dashboard"], roles: ['Admin', 'Staff', 'Teacher']},
    children: []
  },
  {
    path: 'institute-list',
    component: InstituteListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Institute List", breadcrumbs: ["Institute List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'institute-create',
    component: InstituteCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Institute", breadcrumbs: ["Create Institute"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'institute-view',
    component: InstituteViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "View Institute", breadcrumbs: ["View Institute"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "User List", breadcrumbs: ["User List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create User", breadcrumbs: ["User List", "Create User"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update User", breadcrumbs: ["User List", "Update User"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'user-view/:id',
    component: UserViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "View User", breadcrumbs: ["User List", "View User"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'department-list',
    component: DepartmentListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Department List", breadcrumbs: ["Department List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'department-form',
    component: DepartmentFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Department", breadcrumbs: ["Department List", "Create Department"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'department-form/:id',
    component: DepartmentFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Department", breadcrumbs: ["Department List", "Update Department"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'faculty-list',
    component: FacultyListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Faculty List", breadcrumbs: ["Faculty List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'faculty-form',
    component: FacultyFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Faculty", breadcrumbs: ["Faculty List", "Create Faculty"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'faculty-form/:id',
    component: FacultyFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Faculty", breadcrumbs: ["Faculty List", "Update Faculty"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Student List", breadcrumbs: ["Student List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'student-form',
    component: StudentFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Student", breadcrumbs: ["Student List", "Create Student"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'student-form/:id',
    component: StudentFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Student", breadcrumbs: ["Student List", "Update Student"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'student-view/:id',
    component: StudentViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "View Student", breadcrumbs: ["Student List", "View Student"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'program-list',
    component: ProgramListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Program List", breadcrumbs: ["Program List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'program-form',
    component: ProgramFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Program", breadcrumbs: ["Program List", "Create Program"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'program-form/:id',
    component: ProgramFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Program", breadcrumbs: ["Program List", "Update Program"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'semester-list',
    component: SemesterListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Semester List", breadcrumbs: ["Semester List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'semester-form',
    component: SemesterFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Semester", breadcrumbs: ["Semester List", "Create Semester"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'semester-form/:id',
    component: SemesterFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Semester", breadcrumbs: ["Semester List", "Update Semester"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'course-list',
    component: CourseListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Course List", breadcrumbs: ["Course List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'course-form',
    component: CourseFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Course", breadcrumbs: ["Course List", "Create Course"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'course-form/:id',
    component: CourseFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Course", breadcrumbs: ["Course List", "Update Course"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'examination-list',
    component: ExaminationListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Examination List", breadcrumbs: ["Examination List"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'examination-form',
    component: ExaminationFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Create Examination", breadcrumbs: ["Examination List", "Create Examination"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'examination-form/:id',
    component: ExaminationFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Update Examination", breadcrumbs: ["Examination List", "Update Examination"], roles: ['Admin', 'Staff', 'Teacher']}
  },
  {
    path: 'examination-marks-entry/:id',
    component: ExaminationMarksEntryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {pageTitle: "Marks Entry", breadcrumbs: ["Examination List", "Marks Entry"], roles: ['Admin', 'Staff', 'Teacher']}
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
