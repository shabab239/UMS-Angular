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
import { PageHeaderComponent } from './template/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InstituteListComponent,
    InstituteViewComponent,
    InstituteCreateComponent,
    PageHeaderComponent
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
