import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import * as AuthActions from '../../../store/auth/auth.actions'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp: string = '';
  @Input() generatedOTP: string = ''; // Store the generated OTP here (simulated)
  @Input() user :any

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

  handeOtpChange(value: string[]): void {
  }

  handleFillEvent(value: string): void {
   this.otp=value
   if (this.otp === this.generatedOTP) {
    const payload = {
        fullname:this.user.fullname,
        email:this.user.email,
        password:this.user.password,
        banner:this.user.banner
      }
    this.store.dispatch(AuthActions.registerRequest({credentials:payload}))

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


  constructor(private store:Store,){}

  verifyOTP() {
    if (this.otp === this.generatedOTP) {
      const payload = {
          fullname:this.user.fullname,
          email:this.user.email,
          password:this.user.password,
          banner:this.user.banner
        }
      this.store.dispatch(AuthActions.registerRequest({credentials:payload}))

    } else {
      // OTP is incorrect, show an error message or take appropriate action
      console.error('Incorrect OTP. Please try again.');
    }
  }


}
