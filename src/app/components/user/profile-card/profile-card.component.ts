import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
@Input() user:any
@Input() following:boolean|null=false
users:any = []
followings:any =[]
loggedIn =false
@ViewChild(MatPaginator) paginator: MatPaginator | any;
obs: Observable<any>|any;
dataSource: MatTableDataSource<any> |any

constructor(private profile:ProfileService, private route:ActivatedRoute,private changeDetectorRef: ChangeDetectorRef){}

ngOnInit(): void {
this.loggedIn=false
  let id:string|null=null
  this.route.params.subscribe(params => {
    id = params['id'];
  });
  this.profile.getUser().subscribe({
    next:(res)=>{
      if(this.user.user_id==res.user.user_id&&id){
        this.loggedIn=true
      }else if(!id){
        this.loggedIn=true
      }
    }
  })
}

follow(){
  this.profile.follow(this.user.user_id).subscribe({
    next: (res)=>{
      this.following=true
      this.user=res.user
    },
    error: (error)=>{
      alert(error.error)
    }
  })
}
isFollow(id:string){
  this.profile.isFollow(id).subscribe({
    next:(res)=>{
      return res.status
    },
    error:(err)=>{
      console.log("oops")
      return false
    }
  })
}

unfollow(){
  this.profile.unFollow(this.user.user_id).subscribe({
    next: (res)=>{
      this.following=false
      this.user=res.user
    },
    error: (error)=>{
      alert(error.error)
    }
  })
}

followers(){
  this.users=this.user.followers
  this.dataSource = new MatTableDataSource<any>(this.users);
  this.changeDetectorRef.detectChanges();
  this.dataSource.paginator = this.paginator;
  this.obs = this.dataSource.connect();
}

isfollowing(){
  this.users= this.user.following
  this.dataSource = new MatTableDataSource<any>(this.users);
  this.changeDetectorRef.detectChanges();
  this.dataSource.paginator = this.paginator;
  this.obs = this.dataSource.connect();
}

ngOnDestroy() {
  if (this.dataSource) {
    this.dataSource.disconnect();
  }
}
}
