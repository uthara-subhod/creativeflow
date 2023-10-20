import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MListComponent } from './components/moderator/m-list/m-list.component';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './components/users/users.component';
import { ClarityModule } from "@clr/angular";
import { MaterialModule } from '../material.module';
import { AppNavItemComponent } from './components/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrandingComponent } from './components/sidebar/branding.component';
import { ListComponent } from './components/artist/list/list.component';
import { FormComponent } from './components/artist/form/form.component';
import { LogsComponent } from './components/moderator/logs/logs.component';
import { WListComponent } from './components/author/list/list.component';
import { WFormComponent } from './components/author/form/form.component';
import { SListComponent } from './components/service/list/list.component';
import { SFormComponent } from './components/service/form/form.component';
import { TListComponent } from './components/transactions/list/list.component';
import { MFormComponent } from './components/moderator/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { LoginComponent } from './components/login/login.component';
import { GFormComponent } from './components/genre/form/form.component';
import { GListComponent } from './components/genre/list/list.component';

import { FormsModule } from '@angular/forms';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';
import { CategoryFormComponent } from './components/category-form/category-form.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    MListComponent,
    UsersComponent,
    AppNavItemComponent,
    SidebarComponent,
    BrandingComponent,
    ListComponent,
    FormComponent,
    LogsComponent,
    WListComponent,
    WFormComponent,
    SListComponent,
    SFormComponent,
    TListComponent,
    MFormComponent,
    TableComponent,
    ActionButtonComponent,
    LoginComponent,
    CategoryFormComponent,
    GFormComponent,
    GListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    ClarityModule,
    MaterialModule,
    FormsModule,
    UploadWidgetModule,
  ],
})
export class AdminModule { }
