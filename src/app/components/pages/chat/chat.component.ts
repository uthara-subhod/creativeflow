import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatlist:any
  isChat =false
  users:any
  searchQuery=''
constructor(private authService:AuthService, private profile:ProfileService, private router:Router, private route:ActivatedRoute){}
ngOnInit(){
  let user=''
  this.route.params.subscribe(params => {
    user = params['user'];
    this.profile.getUser().subscribe({
      next:(res)=>{
        console.log(res.user.chat)
        this.chatlist = res.user.chat
      }
    })
    if(user){
      this.isChat=true
    }
  });
  this.profile.getUsers().subscribe({
    next: (res: any) => {
      this.users=res.users 
    },
    error: (err) => {
      this.router.navigate(['/error'])
    }
  })

}

openChat(id:string){
  this.router.navigate([`/message/${id}`])
}

get searchUsers() {
  if(this.searchQuery==''){
    return this.chatlist
  }
  return this.users.filter(user =>
    user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

search(e){
  if(e.value==''){
    this.searchQuery=this.chatlist
  }
}
}
