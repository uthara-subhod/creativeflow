import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private socketService:SocketService){}
  notifications: string[] = [];

  ngOnInit(): void {
    
    // this.notifications=this.socketService.getNotifications('01551948-973d-468d-876f-d59200957745')
  }

}
