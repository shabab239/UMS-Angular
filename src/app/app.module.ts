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
    FacultyListComponent
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
