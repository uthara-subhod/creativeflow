import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../../../../store/app.reducer'
import * as AuthActions from '../../../../store/auth/auth.actions';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth:AuthService, private router:Router, private store: Store<appReducer.AppState> , private cookie:CookieService){}
  otp:string = ''
  isOtp =false
  email:string=''
  user={
    fullname:'',
    email:'',
    password:'',
  }
  repass=''
  hide = true;
  register(){
    this.user.password=this.user.password.trim()
    this.repass=this.repass.trim()
    this.user.email=this.user.email.trim()
    if(this.user.email==''){
      alert("Email cannot be empty")
      return
    }
    if(this.user.password==""){
      alert("password cannot be empty")
      return
    }
    if(this.user.password!=''&& this.user.password!=this.repass){
      console.log(this.user.password,this.repass)
      alert("Passwords dont match")
      return
    }
    this.email= this.censorEmail()
    const data = {email:this.user.email}
    this.auth.getOtp(data).subscribe({
      next:(res)=>{
        this.otp=res.otp
        this.isOtp = true
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


}
