import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/pages/user/register/register.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/pages/user/home/home.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
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
import {CloudinaryModule} from '@cloudinary/ng';
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import { OtpComponent } from './components/user/otp/otp.component';


const config: SocketIoConfig = {
	url: 'http://localhost:3000', // socket server url;
	options: {
		transports: ['websocket']
	}
}



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ErrorComponent,
    PeopleComponent,
    UserCardComponent,
    ProfileCardComponent,
    LoginComponent,
    NotificationsComponent,
    EditProfileComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PasswordModule,
    InputTextModule,
    InputMaskModule,
    NgxPageScrollCoreModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CloudinaryModule,
    UploadWidgetModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects,AuthEffects]),
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
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
