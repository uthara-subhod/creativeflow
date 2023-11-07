import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SocketService } from 'src/app/services/socket.service';
import * as AuthActions from '../../../../store/auth/auth.actions'
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showDropdown: boolean = false;
  userId=''
  isSocial=false
  logIn:boolean = false
  count= 0
  constructor(private profile:ProfileService,private socialAuthService:SocialAuthService, private socket:SocketService, private auth:AuthService, private store:Store){}
ngOnInit(): void {
 if(this.auth.getToken()){
  this.logIn=true
 }

  if(this.logIn ||this.auth.getToken()!=''||this.auth.getToken()){

    this.profile.getUser().subscribe({
      next: (res: any) => {
        this.userId=res.user.user_id
        this.logIn=true
        this.isSocial=res.user.isSocial
      },
      error: (err) => {
        this.userId=''
        this.logIn = false
        localStorage.removeItem('token')
      }
    })
  }
}

toggleDropdown() {
  this.showDropdown = !this.showDropdown;

}

findCount(e){
  this.count = e
}

logout(){
  if(this.isSocial){
      this.socialAuthService.signOut();
      localStorage.removeItem('token')
      this.userId=''
      this.ngOnInit()

  }else{

    this.store.dispatch(AuthActions.logout())
    this.userId=''
    this.ngOnInit()
  }
}
}
