import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../../../../store/app.reducer'
import * as AuthActions from '../../../../store/auth/auth.actions';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:AuthService, private router:Router, private store: Store<appReducer.AppState> , private cookie:CookieService){}

  user={
    email:'',
    password:'',
  }
  hide = true;
  login(){
    this.user.password=this.user.password.trim()
    this.user.email=this.user.email.trim()
    const payload = {
      email:this.user.email,
      password:this.user.password
    }



      this.store.dispatch(AuthActions.loginRequest({credentials:payload}));


  }

  generateOTP(): string {
    // Generate a 6-digit random OTP (you can customize this)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

}

