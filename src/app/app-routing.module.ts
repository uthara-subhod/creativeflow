import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/pages/user/register/register.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { PeopleComponent } from './components/pages/people/people.component';
import { LoginComponent } from './components/pages/user/login/login.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component:HomeComponent},
  {path:'user/:id',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'profile/edit',component:EditProfileComponent},
  {path:'browse/people',component:PeopleComponent},
  { path: 'error', component: ErrorComponent },
  // {path:'admin',component:DashboardComponent,canActivate: [AdminGuard],},
  // {path:'admin/user/:id',component:UserComponent, canActivate: [AdminGuard]},
  // {path:'admin/create',component:CreateUserComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
