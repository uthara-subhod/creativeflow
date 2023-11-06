import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../../../../store/app.reducer'
import * as AuthActions from '../../../../store/auth/auth.actions';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private socialAuthService: SocialAuthService, private router: Router, private store: Store<appReducer.AppState>, private cookie: CookieService) { }
  socialUser!: SocialUser;
  loginForm!: FormGroup;
  isLoggedin?: boolean;
  private accessToken = '';
  user = {
    email: '',
    password: '',
    remember:false
  }
  hide = true;
  ngOnInit(){
    this.socialAuthService.authState.subscribe((user:any) => {
      if(user!=null){
        const no =Math.floor(Math.random() * 1084)+'';
        axios.get(`https://picsum.photos/id/${no}/info`)
      .then(response => {
        user.banner = response.data.download_url
        this.auth.googleAuth(user).subscribe({
          next:(res)=>{
          this.cookie.set('token',res.token)
          localStorage.setItem('token', res.token);
          this.auth.setAuthenticated(true);
          const email=res.user.email as string
          const username = res.user.fullname
          this.router.navigateByUrl('/');

          Swal.fire({
            toast: true,
            icon:'success',
            title:`Welcome back, ${username}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }

          );
          }
        })
      })
      .catch(error => {
        console.error('Error fetching the random image:', error);
      });

      }
    });
  }
  login() {
    this.user.password = this.user.password.trim()
    this.user.email = this.user.email.trim()
    if (this.user.email == '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email is invalid',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    if (this.user.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fields cannot be empty',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }


    const payload = {
      email: this.user.email,
      password: this.user.password,
      remember:this.user.remember
    }


    this.store.dispatch(AuthActions.loginRequest({ credentials: payload }));


  }

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }



}

