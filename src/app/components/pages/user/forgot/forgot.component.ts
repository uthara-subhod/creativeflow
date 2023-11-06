import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import * as appReducer from '../../../../store/app.reducer'
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  otpExpirationMinutes: number = 2;
  isPassword = false
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  @ViewChild('ngxotp') ngxOtp: any;
  otpExpirationMilliseconds: number = this.otpExpirationMinutes * 60 * 1000;
  countdown: number = this.otpExpirationMilliseconds / 1000;
  timer: any;
  resend = false
  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService, private store: Store<appReducer.AppState>, private cookie: CookieService) { }
  otp: string = ''
  generatedOTP: string = '';

  isOtp = false
  email: string = ''
  user = {
    fullname: '',
    email: '',
    password: '',
    banner: '',
  }
  repass = ''
  hide = true;
  startTimer() {
    this.timer = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
        // Handle timer expiration here (e.g., show a message to the user)
        this.timerExpired();
      }
    }, 1000); // Update the countdown every second (1000 milliseconds)
  }

  timerExpired() {
    this.otp = ''
    this.resend = true
  }
  submit() {
    const no = Math.floor(Math.random() * 1084) + '';

    this.user.email = this.user.email.trim()
    if (this.user.email == '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email is invalid',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }

    this.email = this.censorEmail()
    const data = { email: this.user.email, forgot: true }
    this.isOtp = true
    this.auth.getOtp(data).subscribe({
      next: (res) => {
        this.generatedOTP = res.otp
        this.startTimer();

      },
      error: (err) => {
        this.isOtp = false
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        })
        return
      }
    })

  }

  censorEmail(): string {
    const atIndex = this.email.indexOf('@');
    if (atIndex === -1) {
      return this.email;
    }
    const prefix = this.email.substring(0, atIndex);

    const censoredPrefix = prefix.replace(/./g, '*');
    const censoredEmail = censoredPrefix + this.email.substring(atIndex);

    return censoredEmail;
  }

  resendOTP() {
    const data = { email: this.user.email }
    this.auth.getOtp(data).subscribe({
      next: (res) => {
        this.otp = res.otp
        this.startTimer();
      },
      error: (err) => {
        alert(err.error.msg)
      }
    })
  }

  handeOtpChange(value: string[]): void {
  }

  handleFillEvent(value: string): void {
    this.otp = value
    if (this.otp === this.generatedOTP) {
      this.isPassword = true
    } else {
      this.ngxOtp.clear()
      Swal.fire({
        icon: 'error',
        title: 'Incorrect otp',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
  }

  confirm() {
    this.user.password=this.user.password.trim()
    this.repass=this.repass.trim()
    if (this.user.password == "") {
      Swal.fire({
        icon: 'error',
        title: 'password cannot be empty',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    if (this.user.password != '' && this.user.password != this.repass) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords dont match',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    const data = {
      email:this.user.email,
      password:this.user.password
    }
    this.auth.password(data).subscribe({
      next:(res)=>{

        Swal.fire({
          toast: true,
          icon:'success',
          title:`Password have been changed`,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }

        );
        this.router.navigateByUrl('/login')
      },error:()=>{
        Swal.fire({
          icon: 'error',
          title: 'Incorrect otp',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        })
      }
    })

  }


}
