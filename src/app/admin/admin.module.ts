import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoutingModule } from './admin-routing.module'
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './components/users/users.component';
import { ClarityModule } from "@clr/angular";
import { MaterialModule } from '../material.module';
import { ListComponent } from './components/artist/list/list.component';
import { FormComponent } from './components/artist/form/form.component';
import { SListComponent } from './components/service/list/list.component';
import { SFormComponent } from './components/service/form/form.component';
import { TListComponent } from './components/transactions/list/list.component';
import { TableComponent } from './components/table/table.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { LoginComponent } from './components/login/login.component';
import { GFormComponent } from './components/genre/form/form.component';
import { GListComponent } from './components/genre/list/list.component';
import { PListComponent } from './components/providers/list/list.component';
import { FormsModule } from '@angular/forms';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NgChartsModule } from 'ng2-charts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SalesComponent } from './components/sales/sales.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportComponent } from './components/report/report.component';
@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    ListComponent,
    FormComponent,
    SListComponent,
    SFormComponent,
    TListComponent,
    PListComponent,
    TableComponent,
    ActionButtonComponent,
    LoginComponent,
    CategoryFormComponent,
    GFormComponent,
    GListComponent,
    SalesComponent,
    ReportsComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    ClarityModule,
    MaterialModule,
    NgChartsModule,
    FormsModule,
    UploadWidgetModule,
    CanvasJSAngularChartsModule
  ],
})
export class AdminModule { }
