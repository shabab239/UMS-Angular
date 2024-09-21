import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './template/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {FooterComponent} from './template/footer/footer.component';
import {SidebarComponent} from './template/sidebar/sidebar.component';
import {InstituteListComponent} from "./admin/institute/institute-list/institute-list.component";
import {InstituteViewComponent} from "./admin/institute/institute-view/institute-view.component";
import {InstituteCreateComponent} from "./admin/institute/institute-create/institute-create.component";
import {UserListComponent} from './admin/user/user-list/user-list.component';
import {UserFormComponent} from './admin/user/user-form/user-form.component';
import {UserViewComponent} from './admin/user/user-view/user-view.component';
import {PageNotFoundComponent} from './template/page-not-found/page-not-found.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {LoginComponent} from './security/login/login.component';
import {StudentListComponent} from './academy/student/student-list/student-list.component';
import {AuthInterceptor} from "./security/auth/interceptor/auth.interceptor";
import {StudentViewComponent} from './academy/student/student-view/student-view.component';
import {StudentFormComponent} from "./academy/student/student-form/student-form.component";
import {NgSelectModule} from "@ng-select/ng-select";
import { FacultyFormComponent } from './academy/faculty/faculty-form/faculty-form.component';
import { FacultyListComponent } from './academy/faculty/faculty-list/faculty-list.component';
import { DepartmentListComponent } from './academy/department/department-list/department-list.component';
import { DepartmentFormComponent } from './academy/department/department-form/department-form.component';
import { ProgramListComponent } from './academy/program/program-list/program-list.component';
import { ProgramFormComponent } from './academy/program/program-form/program-form.component';
import { SemesterListComponent } from './academy/semester/semester-list/semester-list.component';
import { SemesterFormComponent } from './academy/semester/semester-form/semester-form.component';
import { CourseFormComponent } from './academy/course/course-form/course-form.component';
import { CourseListComponent } from './academy/course/course-list/course-list.component';
import { ExaminationListComponent } from './academy/examination/examination-list/examination-list.component';
import { ExaminationFormComponent } from './academy/examination/examination-form/examination-form.component';
import { ExaminationMarksEntryComponent } from './academy/examination/examination-marks-entry/examination-marks-entry.component';
import { ExaminationResultViewComponent } from './academy/examination/examination-result-view/examination-result-view.component';
import { JournalComponent } from './accounting/journal/journal.component';
import { BalanceSheetComponent } from './accounting/balance-sheet/balance-sheet.component';
import {BracketCurrencyPipe} from "./pipe/BracketCurrencyPipe";
import {TkCurrencyPipe} from "./pipe/TkCurrencyPipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InstituteListComponent,
    InstituteViewComponent,
    InstituteCreateComponent,
    UserListComponent,
    UserFormComponent,
    UserViewComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentViewComponent,
    FacultyFormComponent,
    FacultyListComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    ProgramListComponent,
    ProgramFormComponent,
    SemesterListComponent,
    SemesterFormComponent,
    CourseFormComponent,
    CourseListComponent,
    ExaminationListComponent,
    ExaminationFormComponent,
    ExaminationMarksEntryComponent,
    ExaminationResultViewComponent,
    JournalComponent,
    BalanceSheetComponent,
    BracketCurrencyPipe,
    TkCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
