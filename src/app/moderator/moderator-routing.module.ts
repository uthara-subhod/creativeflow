import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../services/route-guard.service';
import { ReportComponent } from './components/report/report.component';



const moderatorRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {path:'reports/:report_id', component:ReportComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moderatorRoutes)],
  exports: [RouterModule],
})
export class ModeratorRoutingModule { }
