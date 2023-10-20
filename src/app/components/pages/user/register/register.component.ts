import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../../../../store/app.reducer'
import * as AuthActions from '../../../../store/auth/auth.actions';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  otpExpirationMinutes: number = 2;
  otpExpirationMilliseconds: number = this.otpExpirationMinutes * 60 * 1000;
  countdown: number = this.otpExpirationMilliseconds / 1000;
  timer: any;
  resend=false
  constructor(private auth:AuthService, private router:Router, private cookieService:CookieService, private store: Store<appReducer.AppState> , private cookie:CookieService){}
  otp:string = ''
  isOtp =false
  email:string=''
  user={
    fullname:'',
    email:'',
    password:'',
    banner:'',
  }
  repass=''
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
    this.otp=''
    this.resend=true
  }
  register(){
    const no =Math.floor(Math.random() * 1084)+'';
    axios.get(`https://picsum.photos/id/${no}/info`)
  .then(response => {
    this.user.banner = response.data.download_url
  })
  .catch(error => {
    console.error('Error fetching the random image:', error);
  });
    this.user.password=this.user.password.trim()
    this.repass=this.repass.trim()
    this.user.email=this.user.email.trim()
    if(this.user.email==''){
      Swal.fire({
        icon: 'error',
        title: 'Email cannot be empty',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    if(this.user.password==""){
      Swal.fire({
        icon: 'error',
        title: 'password cannot be empty',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    if(this.user.password!=''&& this.user.password!=this.repass){
      Swal.fire({
        icon: 'error',
        title: 'Passwords dont match',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    this.email= this.censorEmail()
    const data = {email:this.user.email}
    this.isOtp = true
    this.auth.getOtp(data).subscribe({
      next:(res)=>{
        this.otp=res.otp
        this.cookieService.set('otp', res.otp, { expires: 2 / (24 * 60) , sameSite: 'Lax' });
        this.startTimer();

      },
      error:(err)=>{
        alert(err.error.msg)
      }
    })
    // const payload = {
    //   fullname:this.user.fullname,
    //   email:this.user.email,
    //   password:this.user.password
    // }
      // this.store.dispatch(AuthActions.registerRequest({credentials:payload}));

    // this.auth.register(this.user).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('token',res.token)
    //     this.router.navigate(['/'])
    //    console.log(res.token)
    //   },
    //   error: (err) => {
    //     console.log(err.error.error)
    //     alert(err.error.error);
    //   }
    // })
  }

   censorEmail(): string {
    const atIndex = this.email.indexOf('@'); // Find the index of the "@" symbol
    if (atIndex === -1) {
      // If there is no "@" symbol, return the original email
      return this.email;
    }

    // Extract the part of the email before the "@" symbol
    const prefix = this.email.substring(0, atIndex);

    // Replace characters in the prefix with asterisks (*) to censor it
    const censoredPrefix = prefix.replace(/./g, '*');

    // Combine the censored prefix with the rest of the email
    const censoredEmail = censoredPrefix + this.email.substring(atIndex);

    return censoredEmail;
  }

  resendOTP(){
    const data = {email:this.user.email}
    this.auth.getOtp(data).subscribe({
      next:(res)=>{
        this.otp=res.otp
        this.cookieService.set('otp', res.otp, { expires: 2 / (24 * 60) , sameSite: 'Lax' });
        this.startTimer();
      },
      error:(err)=>{
        alert(err.error.msg)
      }
    })
  }

}
