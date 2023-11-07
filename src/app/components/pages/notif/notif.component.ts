import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { BehaviorSubject } from 'rxjs';
import { apiURL } from 'src/environments/environment';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent implements AfterViewInit{
  notificationsLoaded$ = new BehaviorSubject<boolean>(false);
  constructor(private profile:ProfileService, private authService:AuthService){}
  userId=''
  areNotificationsLoaded = false;
  notifications:any[]=[]
  ngAfterViewInit(): void {

  }
ngOnInit(): void {
  this.profile.getUser().subscribe({
    next:(res)=>{
      this.userId=res.user.user_id
      this.profile.getNotifications(this.userId).subscribe({
        next:(res)=>{
          const n:any[] = res.notifications
          if(res.notifications.length==0){
            this.notificationsLoaded$.next(true);
          }
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
            }else if (a.types=='vote'){
              this.notifications.push({
                type:a.types,
                from:a.from,
                msg:'voted your work',
                time:a.createdAt,
                item:JSON.parse(a.item)
              })
            }else if (a.types=='comment'){
              const item = JSON.parse(a.item)
              let link = ''
              if(item.location=='chapter'){
                link+='/browse/books/chapter/'+item.id
              }else{
                link+='/user/'+a.from.user_id
              }
              this.notifications.push({
                type:a.types,
                from:a.from,
                msg:'commented',
                time:a.createdAt,
                comment:item.message,
                link:link
              })
            }
          }
        },
        error:(err)=>[

          console.log(err.error)

        ]})
        const config: SocketIoConfig = {
          url: apiURL, // socket server url;
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
