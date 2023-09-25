import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SocketService } from 'src/app/services/socket.service';
import * as AuthActions from '../../../../store/auth/auth.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showDropdown: boolean = false;
  userId=''
  logIn:boolean = false
  constructor(private profile:ProfileService, private socket:SocketService, private auth:AuthService, private store:Store){}
ngOnInit(): void {
  this.profile.getUser().subscribe({
    next: (res: any) => {
      this.userId=res.user.user_id
      this.logIn=true
    },
    error: (err) => {
      this.userId=''
      this.logIn = false
     console.log('no user')

    }
  })
}

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
  console.log(this.showDropdown)
}

logout(){
  console.log("Hey")
  this.store.dispatch(AuthActions.logout());
  this.userId=''
  this.ngOnInit()
}


}
