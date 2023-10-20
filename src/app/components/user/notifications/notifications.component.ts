import { Component, Input, OnInit } from '@angular/core';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  @Input()userId=''
  notifications:any[]=[]
  constructor(private profile:ProfileService, private authService:AuthService){}


ngOnInit(): void {

  this.profile.getUser().subscribe({
    next: (res: any) => {
      this.profile.getNotifications(this.userId).subscribe({
        next:(res)=>{
          const n:any[] = res.notifications
          this.notifications=[]
          for(let a of n){
            if(a.types=='follow'){
              this.notifications.push({
                type:a.types,
                from:a.from,
                time:a.createdAt,
                msg:"has followed you"
              })
            }else if(a.types=='book'){
              this.notifications.push({
                type:a.types,
                from:a.from,
                msg:'published ',
                time:a.createdAt,
                book:JSON.parse(a.item)
              })

            }
          }
        },
        error:(err)=>[
          console.log(err.error)
        ]
      })
      const config: SocketIoConfig = {
        url: 'http://localhost:3000', // socket server url;
        options: {
          transports: ['websocket'],
          query: { userId: this.userId , token: this.authService.getToken()}
        }
      }

      const customSocket = new Socket(config);
      customSocket.connect()
      customSocket.fromEvent('notification').subscribe({
        next:(res)=>{
          this.ngOnInit()

        },
        error:(err)=>{
          console.log("oops")
        }
      })


    },
    error: (err) => {
     console.log('eroror')

    }
  })
}
isEmpty(){
  return this.notifications.length===0
}

clearAll(){
  console.log("hiii")
  this.profile.clearNotif(this.userId).subscribe({
    next:(res)=>{
      this.notifications=[]
    }
  })
}
}
