import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/admin.actions'
import { NavigationEnd, Router } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  nav =false
  isSidebarToggled = false
  activeRoute: string ='';
  constructor(private store:Store, private router:Router){}
  openNav(){
    this.nav=!this.nav
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });

  }
  toggle(){
    console.log("hiii")
    this.isSidebarToggled=!this.isSidebarToggled
  }
  logout(){
    this.store.dispatch(AuthActions.adminLogout())
  }
}
