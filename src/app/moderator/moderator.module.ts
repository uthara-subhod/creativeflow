import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ModeratorRoutingModule } from './moderator-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ReportComponent } from './components/report/report.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    ReportComponent,

  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ModeratorModule { }
