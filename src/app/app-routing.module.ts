import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/pages/user/register/register.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { PeopleComponent } from './components/pages/people/people.component';
import { LoginComponent } from './components/pages/user/login/login.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import { AuthGuard, CanDeactivateGuard, isCreator, loggedIn } from './services/route-guard.service';
import { PricingComponent } from './components/pages/create/pricing/pricing.component';
import { CreateBookMainComponent } from './components/pages/create/create-book-main/create-book-main.component';
import { CworksComponent } from './components/pages/create/cworks/cworks.component';
import { RolesComponent } from './components/pages/create/roles/roles.component';
import { BooksComponent } from './components/pages/books/books.component';

import { ChapterComponent } from './components/pages/create/chapter/chapter.component';
import { BookComponent } from './components/pages/book/book.component';
import { BChapterComponent } from './components/pages/chapter/chapter.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard as Guard } from './moderator/services/guard.service';
import { ChatComponent } from './components/pages/chat/chat.component';
import { ArtworksComponent } from './components/pages/artworks/artworks.component';
import { ArtworkComponent } from './components/pages/create/artwork/artwork.component';
import { CopyrightFormComponent } from './components/copyright-form/copyright-form.component';
import { NotifComponent } from './components/pages/notif/notif.component';
import { ProviderFormComponent } from './components/pages/provider-form/provider-form.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { DashboardComponent } from './components/pages/create/dashboard/dashboard.component';
import { TransactionsComponent } from './components/pages/create/transactions/transactions.component';
import { ForgotComponent } from './components/pages/user/forgot/forgot.component';
import { ChatroomComponent } from './components/pages/chatroom/chatroom.component';


const routes: Routes = [
  {path:'login',component:LoginComponent, canActivate: [loggedIn]},
  {path:'register',component:RegisterComponent, canActivate: [loggedIn]},
  {path:'forgot',component:ForgotComponent, canActivate: [loggedIn]},
  {path:'',component:HomeComponent},
  {path:'notification',component:NotifComponent},
  {path:'user/:id',component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'services/join',component:ProviderFormComponent, canActivate: [AuthGuard]},
  {path:'profile',component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'profile/edit',component:EditProfileComponent, canActivate: [AuthGuard]},
  {path:'browse/people',component:PeopleComponent},
  {path:'browse/books',component:BooksComponent},
  {path:'browse/services',component:ServicesComponent},
  {path:'services/:id',component:ServiceComponent},
  {path:'browse/artworks',component:ArtworksComponent},
  {path:'report/book/:book_id',component:CopyrightFormComponent},
  {path:'report/chapter/:chapter_id',component:CopyrightFormComponent},
  {path:'report/artwork/:artwork_id',component:CopyrightFormComponent},
  {path:'browse/books/:id',component:BookComponent},
  {path:'browse/books/chapter/:id',component:BChapterComponent, canActivate: [AuthGuard]},
  {path:'create/plans',component:PricingComponent, canActivate: [AuthGuard]},
  {path:'create/roles',component:RolesComponent,  canActivate: [AuthGuard]},
  {path:'create',component:DashboardComponent, canActivate: [AuthGuard, isCreator]},
  {path:'create/works',component:CworksComponent, canActivate: [AuthGuard, isCreator]},
  {path:'create/book/:id',component:CreateBookMainComponent, canActivate: [AuthGuard, isCreator], canDeactivate:[(component: CreateBookMainComponent) => component.canDeactivate()]},
  {path:'create/chapter/:id',component:ChapterComponent, canActivate: [AuthGuard, isCreator]},
  {path:'create/artwork/:id',component:ArtworkComponent, canActivate: [AuthGuard, isCreator]},
  {path:'create/transactions',component:TransactionsComponent, canActivate: [AuthGuard, isCreator]},
  {path:'message',component:ChatComponent, canActivate: [AuthGuard]},
  {path:'message/:user',component:ChatroomComponent, canActivate: [AuthGuard]},

  {
    path: 'behindflow',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'moderator',
    canActivate:[Guard],
    loadChildren: () =>
      import('./moderator/moderator.module').then((m) => m.ModeratorModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
