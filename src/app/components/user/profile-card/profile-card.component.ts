import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
@Input() user:any
@Input() following:boolean|null=false
loggedIn =false
constructor(private profile:ProfileService, private route:ActivatedRoute){}

ngOnInit(): void {
this.loggedIn=false
  let id:string|null=null
  this.route.params.subscribe(params => {
    id = params['id'];
  });
  this.profile.getUser().subscribe({
    next:(res)=>{

      if(id==res.user.user_id&&id){
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
      console.log("damn",error.error)
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
      console.log(error.error)
    }
  })
}
}
