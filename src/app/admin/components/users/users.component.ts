import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AdminService } from 'src/app/services/admin.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  display=['Full Name','Email','Joining Date', 'Status']
  columns=['fullname','email','joinedAt','access'];





  data:any
  constructor(private user:ProfileService, private admin:AdminService){
    this.admin.userUpdated$.subscribe((updated) => {
      if (updated) {
        this.admin.fetchTable('users').subscribe({
          next:(res)=>{
            this.data=res.data
          }
        })
      }
    });
  }
ngOnInit(): void {
  this.admin.fetchTable('users').subscribe({
    next:(res)=>{
      this.data=res.data
    }
  })
  // this.user.getUsers().subscribe({
  //   next:(res)=>{
  //     this.data=res.users
  //   }
  // })
}


}
