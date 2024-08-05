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

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: "Dashboard", breadcrumbs: "Dashboard" },
    children: []
  },

  {path: 'institute-list', component: InstituteListComponent, data: { title: "Institute List", breadcrumbs: "Institute List" }},
  {path: 'institute-create', component: InstituteCreateComponent, data: { title: "Create Institute", breadcrumbs: "Create Institute" }},
  {path: 'institute-view', component: InstituteViewComponent, data: { title: "View Institute", breadcrumbs: "View Institute" }},

  {path: 'user-list', component: UserListComponent, data: {title: "User List", breadcrumbs: "User List"}},
  {path: 'user-create', component: UserCreateComponent, data: {title: "Create User", breadcrumbs: "Create User"}},
  {path: 'user-view', component: UserViewComponent, data: {title: "View User", breadcrumbs: "View User"}},

  {path: '**', component: PageNotFoundComponent}, // This has to be at the end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BreadcrumbService]
})
export class AppRoutingModule {
}
