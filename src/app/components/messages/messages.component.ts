import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
import { ScrollDirective } from 'src/app/directives/scroll.directive';
import { apiURL } from 'src/environments/environment';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  @ViewChild(ScrollDirective) scroll:ScrollDirective|any
  
  user:any
  messages:any[]=[]
  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  onEmojiSelect(event: EmojiEvent) {
    this.msg += event.emoji.native;
  }

  receiver:any
  msg=''
  constructor(private authService:AuthService, private profile:ProfileService, private route:ActivatedRoute){}
  ngOnInit(){

    let user=''
    this.route.params.subscribe(params => {
      user = params['user'];
      if(user){
        this.profile.isValid(user).subscribe({
          next:(res)=>{
            this.receiver=res.user
            this.profile.getUser().subscribe({
              next: (res: any) => {
                this.user=res.user
                this.profile.getMessages(this.user._id, this.receiver._id).subscribe({
                  next:(res)=>{
                    this.messages=res.messages
                    const config: SocketIoConfig = {
                      url: apiURL, // socket server url;
                      options: {
                        transports: ['websocket'],
                        query: { userId: this.user.user_id , token: this.authService.getToken()}
                      }
                    }

                    const customSocket = new Socket(config);
                    customSocket.connect()
                    customSocket.fromEvent('message').subscribe({
                      next:(res)=>{
                        this.ngOnInit()

                      },
                      error:(err)=>{
                        console.log("oops")
                      }
                    })
                  },
                  error:(err)=>{
                    console.log("hi")
                  }
                })
              },
              error: (err) => {
               console.log('eroror')
              }
            })
          },
          error:()=>{
            //redirect and sweet alert
          }
        })
      }
    });


  }
  send(){
    this.msg=this.msg.trim()
    if(this.msg==''){
      Swal.fire({
        icon: 'error',
        title: 'Miising Field',
        text: `You havent added any message!`,
        showConfirmButton:false,
      })
      return
    }

    this.profile.sendMessage(this.user._id, this.receiver._id,this.msg).subscribe({next:(res)=>{
      this.msg=''
      this.ngOnInit()
    }})
  }



}
