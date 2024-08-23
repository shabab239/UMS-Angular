import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient, withFetch} from "@angular/common/http";
import { FooterComponent } from './template/footer/footer.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import {InstituteListComponent} from "./admin/institute/institute-list/institute-list.component";
import {InstituteViewComponent} from "./admin/institute/institute-view/institute-view.component";
import {InstituteCreateComponent} from "./admin/institute/institute-create/institute-create.component";
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserCreateComponent } from './admin/user/user-create/user-create.component';
import { UserViewComponent } from './admin/user/user-view/user-view.component';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './security/login/login.component';
import { UserUpdateComponent } from './admin/user/user-update/user-update.component';
import { FacultyListComponent } from './academy/faculty/faculty-list/faculty-list.component';
import { FacultyFormComponent } from './academy/faculty/faculty-form/faculty-form.component';
import { DepartmentFormComponent } from './academy/department/department-form/department-form.component';
import { DepartmentListComponent } from './academy/department/department-list/department-list.component';

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
    UserCreateComponent,
    UserViewComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    UserUpdateComponent,
    FacultyListComponent,
    FacultyFormComponent,
    DepartmentFormComponent,
    DepartmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
