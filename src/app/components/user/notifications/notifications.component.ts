import { Component, Input, OnInit } from '@angular/core';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { ProfileService } from 'src/app/services/profile.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  @Input()userId=''
  notifications:any[]=[]
  constructor(private profile:ProfileService){}
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
                from:a.from.fullname,
                msg:"has followeed you"
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
          query: { userId: this.userId }
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
}
