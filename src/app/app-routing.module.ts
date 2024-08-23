import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstituteListComponent} from "./admin/institute/institute-list/institute-list.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./template/page-not-found/page-not-found.component";
import {InstituteCreateComponent} from "./admin/institute/institute-create/institute-create.component";
import {InstituteViewComponent} from "./admin/institute/institute-view/institute-view.component";
import {UserListComponent} from "./admin/user/user-list/user-list.component";
import {LoginComponent} from "./security/login/login.component";
import {UserCreateComponent} from "./admin/user/user-create/user-create.component";
import {UserViewComponent} from "./admin/user/user-view/user-view.component";
import {BreadcrumbService} from "./util/breadcrumb.service";
import {AuthGuard} from "./security/auth/guard/auth.guard";
import {UserUpdateComponent} from "./admin/user/user-update/user-update.component";
import {DepartmentFormComponent} from "./academy/department/department-form/department-form.component";
import {DepartmentListComponent} from "./academy/department/department-list/department-list.component";
import {FacultyFormComponent} from "./academy/faculty/faculty-form/faculty-form.component";
import {FacultyListComponent} from "./academy/faculty/faculty-list/faculty-list.component";

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
    path: 'user-create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create User", breadcrumbs: ["Create User"]}
  },
  {
    path: 'user-update/:id',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update User", breadcrumbs: ["Update User"]}
  },
  {
    path: 'user-view',
    component: UserViewComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "View User", breadcrumbs: ["View User"]}
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
    path: 'faculty-form',
    component: FacultyFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Create Faculty", breadcrumbs: ["Create Faculty"]}
  },
  {
    path: 'faculty-form/:id',
    component: FacultyFormComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Update Faculty", breadcrumbs: ["Update Faculty"]}
  },
  {
    path: 'faculty-list',
    component: FacultyListComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: "Faculty List", breadcrumbs: ["Faculty List"]}
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
