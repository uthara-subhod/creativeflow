import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ListComponent } from './components/artist/list/list.component';
import { SListComponent } from './components/service/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, loggedIn } from './services/admin.guard';
import { GListComponent } from './components/genre/list/list.component';
import { GFormComponent } from './components/genre/form/form.component';
import { FormComponent } from './components/artist/form/form.component';
import { SFormComponent } from './components/service/form/form.component';
import { PListComponent } from './components/providers/list/list.component';
import { TListComponent } from './components/transactions/list/list.component';
import { SalesComponent } from './components/sales/sales.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportComponent } from './components/report/report.component';



const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loggedIn] },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'providers', component: PListComponent },
      { path: 'services', component: SListComponent },
      { path: 'services/add', component: SFormComponent },
      { path: 'services/:id/edit', component: SFormComponent },
      { path: 'genres', component: GListComponent },
      { path: 'genres/add', component: GFormComponent },
      { path: 'genres/:id/edit', component: GFormComponent },
      { path: 'artfields/add', component: FormComponent },
      { path: 'artfields/:id/edit', component: FormComponent },
      { path: 'artfields', component: ListComponent },
      { path: 'transactions', component: TListComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/:report_id', component: ReportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
