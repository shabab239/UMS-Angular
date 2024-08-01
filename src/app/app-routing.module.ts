import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {InstituteListComponent} from "./admin/institute/institute-list/institute-list.component";

const routes: Routes = [
  {path: 'institute-list', component: InstituteListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
