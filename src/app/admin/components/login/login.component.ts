import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import * as AuthActions from '../../../store/auth/admin.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username=''
password=''
hide = true;
constructor(private store:Store){}

login() {
  this.password = this.password.trim()
  this.username = this.username.trim()
  if (this.username == '' || this.password == '') {
    Swal.fire({
      icon: 'error',
      title: 'Fields cannot be empty',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    })
    return
  }
  const payload = {
   username:this.username,
   password:this.password
  }



  this.store.dispatch(AuthActions.adminLogin({ admin: payload }));


}
}
