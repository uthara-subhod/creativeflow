import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user :any
following:boolean=false
constructor(private profile:ProfileService, private route:ActivatedRoute, private router:Router){}
ngOnInit(): void {
  let userId=''
  this.route.params.subscribe(params => {
          userId = params['id'];
        });
        if(userId){
          console.log(userId)
          this.profile.isValid(userId).subscribe({
               next: (res: any) => {
                this.user=res.user
                console.log(res.user)
                this.profile.isFollow(userId).subscribe({
                  next:(res)=>{
                    console.log(res.status)
                    this.following=res.status
                  },
                  error:(err)=>{}
                })
              },
              error: (err) => {
                this.router.navigate(['/'])
              }
          })
        }else{
          this.profile.getUser().subscribe({
            next: (res: any) => {
             this.user=res.user
           },
           error: (err) => {
            console.log()
             this.router.navigate(['/'])
           }
       })
        }
}
}
