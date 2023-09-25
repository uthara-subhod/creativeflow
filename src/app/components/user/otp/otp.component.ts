import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp: string = '';
  @Input() generatedOTP: string = ''; // Store the generated OTP here (simulated)
  @Input() user :any

  constructor(private store:Store){}

  verifyOTP() {
    if (this.otp === this.generatedOTP) {
      const payload = {
          fullname:this.user.fullname,
          email:this.user.email,
          password:this.user.password
        }
      this.store.dispatch(AuthActions.registerRequest({credentials:payload}))

    } else {
      // OTP is incorrect, show an error message or take appropriate action
      console.error('Incorrect OTP. Please try again.');
    }
  }


}
