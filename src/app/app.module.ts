import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/pages/user/register/register.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HomeComponent } from './components/pages/user/home/home.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';;
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AppEffects } from './store/app.effects';
import { reducers } from './store/app.reducer';
import { NavbarComponent } from './components/user/navbar-user/navbar/navbar.component';
import { TokenService, ErrorInterceptor } from './services/token.service';
import { ErrorComponent } from './components/pages/error/error.component';
import { PeopleComponent } from './components/pages/people/people.component';
import { UserCardComponent } from './components/user/user-card/user-card.component';
import { ProfileCardComponent } from './components/user/profile-card/profile-card.component';
import { LoginComponent } from './components/pages/user/login/login.component';
import { NotificationsComponent } from './components/user/notifications/notifications.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { CloudinaryModule } from '@cloudinary/ng';
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import { OtpComponent } from './components/user/otp/otp.component';
import { GenresComponent } from './components/genres/genres.component';
import { ClarityModule } from "@clr/angular";
import { NgxOtpInputModule } from "ngx-otp-input";
import { PricingComponent } from './components/pages/create/pricing/pricing.component';
import { CreateBookMainComponent } from './components/pages/create/create-book-main/create-book-main.component';
import { CworksComponent } from './components/pages/create/cworks/cworks.component';
import { RolesComponent } from './components/pages/create/roles/roles.component';
import { AdminEffects } from './store/auth/admin.effects';
import { AdminInterceptor, AErrorInterceptor } from './services/admin.interceptors';
import { BooksComponent } from './components/pages/books/books.component';
import { MaterialModule } from './material.module';
import { CNavbarComponent } from './components/pages/create/c-navbar/c-navbar.component';
import { TruncatePipe } from './truncate.pipe';
import { ChapterComponent } from './components/pages/create/chapter/chapter.component';
import { CopyrightFormComponent } from './components/copyright-form/copyright-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { BChapterComponent } from './components/pages/chapter/chapter.component';
import { BookComponent } from './components/pages/book/book.component';
import { CommentsComponent } from './components/comments/comments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { ScrollDirective } from './directives/scroll.directive';
import { ArtworksComponent } from './components/pages/artworks/artworks.component';
import { ArtworkComponent } from './components/pages/create/artwork/artwork.component';
import { ANavbarComponent } from './components/pages/create/a-navbar/a-navbar.component';
import { ArtsComponent } from './components/arts/arts.component';
import { ReadButtonComponent } from './components/chapter/read-button/read-button.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { NotifComponent } from './components/pages/notif/notif.component';
import { ProviderFormComponent } from './components/pages/provider-form/provider-form.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { RatingModule } from 'primeng/rating';
import { ServiceComponent } from './components/pages/service/service.component';
import { ForgotComponent } from './components/pages/user/forgot/forgot.component';
import { CreateNavbarComponent } from './components/create/create-navbar/create-navbar.component';
import { DashboardComponent } from './components/pages/create/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { TransactionsComponent } from './components/pages/create/transactions/transactions.component';
import { ChatroomComponent } from './components/pages/chatroom/chatroom.component';
import { LibraryComponent } from './components/pages/library/library.component';
import { BookCardsComponent } from './components/book-cards/book-cards.component';
import { CommissionListComponent } from './components/pages/create/commission-list/commission-list.component';
import { AgreementComponent } from './components/pages/create/agreement/agreement.component';
import { RequestAgreeComponent } from './components/pages/user/request-agree/request-agree.component';







@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    GenresComponent,
    ProfileComponent,
    NavbarComponent,
    ErrorComponent,
    PeopleComponent,
    UserCardComponent,
    ProfileCardComponent,
    LoginComponent,
    PricingComponent,
    NotificationsComponent,
    EditProfileComponent,
    OtpComponent,
    CreateBookMainComponent,
    CworksComponent,
    RolesComponent,
    BooksComponent,
    CNavbarComponent,
    TruncatePipe,
    ChapterComponent,
    CopyrightFormComponent,
    UserListComponent,
    BookComponent,
    BChapterComponent,
    CommentsComponent,
    MessagesComponent,
    ChatComponent,
    ScrollDirective,
    ArtworksComponent,
    ArtworkComponent,
    ANavbarComponent,
    ArtsComponent,
    ReadButtonComponent,
    NotifComponent,
    ProviderFormComponent,
    ServicesComponent,
    ServiceComponent,
    ForgotComponent,
    CreateNavbarComponent,
    DashboardComponent,
    TransactionsComponent,
    ChatroomComponent,
    LibraryComponent,
    BookCardsComponent,
    CommissionListComponent,
    AgreementComponent,
    RequestAgreeComponent,
  ],
  imports: [
    PickerComponent,
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PasswordModule,
    InputTextModule,
    InputMaskModule,
    RatingModule,
    NgChartsModule,
    GoogleSigninButtonModule,
    NgxPageScrollCoreModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    CloudinaryModule,
    UploadWidgetModule,
    MatBadgeModule,
    ClarityModule,
    NgxOtpInputModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects, AuthEffects, AdminEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AErrorInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('184374527371-bjru0ap7tt3lkq75pcoo86sju56alsoj.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
