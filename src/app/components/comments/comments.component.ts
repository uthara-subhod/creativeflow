import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  @Output() commentCount = new EventEmitter<string>();
  url_2 = "https://lh3.googleusercontent.com/YdmDDLkzLXtqADhfwqiKysQAjIiVTxXKG3DZ8iPN5WsAUsKQm4dyftJERAQhzlp9X7lu-eU1zim7DWMGZS9Y6y3_VvXWE6kJDuW8-go9Nyle8vq3wvdTPnhg6ezkuRCDGah31fbWKHZeOiMaIA8E8ZTII8NlrBaLZpFd2K9HOuyzk3jqS-XwY59MOaAIIi_4uhJ-VIM9PGyI5Rc3HmENvEJc5lR2m2F4dGi1zA4E7edlQVX49C3EM53rkUdgHgGzkHPiRmes6pzd04Eg7C0Kpwg-sShQ6hlfsXMWR3YXTBtBcmxdScdBR5ELL7LUSRt5Cau1llsa9ZlAwNZKMQWrxQEjBy6hNdzkZ4-UXl15qukN8WJhY8rlQDNnb4_ojAfbgMJKX2U6ZEjjJHj1VjwBRAIFhhsE_4XcufKBqaMbnVXgEw9S8u_T8QbhieT0ddb5RvzQKW5Nd_W7rTxWkMG4Bhc-ib1dYFzcUjJuBIO33Y38rFvJWGc-WvEyPH4QVkiG-KgqTCmlylUN0JjZXJRV_5KMnm0diGa_JezhZN9wACU9j3sQv1nqj3Ydns5pMbXwyBROI7YJEebOKyugZuOLROq6lCVe68_Y6ACKpMUGNLIXbQ56nuiJRur0M8U3KO-ESnSE5YTQkWFg3AdAqLZIck3aOpjqu5x40beRAeEKqRzMdJ6syDdcYOzp3CYDjVoqrMHm7MlJ41FJAeylBWIrUe1l=s200-no?authuser=0";
  c_input = ''
  r_input = ''
  e_input = ''
  isReply={
    reply:false,
    id:''
  }
  user:any
  comments :any
  @Input() id =''
  @Input() place = ''
  constructor(private comment:CommentService, private profile:ProfileService){}

  ngOnInit(): void {
    this.profile.getUser().subscribe({
      next: (res: any) => {
        this.user=res.user

      },
      error: (err) => {
        this.user=null
      }
    })
    this.comment.getComments(this.id).subscribe({
      next:(res)=>{
        this.comments = res.comments
        this.commentCount.emit(res.comments.length)
      },
      error:()=>{
        this.comments =[]
      }})
  }

  reply(id){
    this.isReply.reply=!this.isReply.reply
    this.isReply.id=id
  }

  submit(id?:any){
    if(id){
      this.r_input=this.r_input.trim()
      if(this.r_input==''){
        Swal.fire({
          icon: 'error',
          title: 'Miising Field',
          text: `You havent added any comment!`,
          showConfirmButton:false,
        })
        return
      }
      const data ={
        user:this.user._id,
        message:this.r_input,
        location:{
          place:this.place,
          id:this.id
        },
        reply:true,
        reply_id:id
      }

      this.comment.addComment(data).subscribe({
        next:(res)=>{
          this.r_input=''
          this.ngOnInit()
        }
      })
    }else{
      this.c_input=this.c_input.trim()
      if(this.c_input==''){
        Swal.fire({
          icon: 'error',
          title: 'Miising Field',
          text: `You havent added any comment!`,
          showConfirmButton:false,
        })
        return
      }
      const data ={
        user:this.user._id,
        message:this.c_input,
        location:{
          place:this.place,
          id:this.id
        },
        reply:false
      }
      this.comment.addComment(data).subscribe({
        next:(res)=>{
          this.c_input=''
          this.ngOnInit()
        }
      })
    }
  }


  edit(value){
    this.e_input=value
  }
  editComment(id) {
    this.e_input=this.e_input.trim()
    if(this.e_input==''){
      Swal.fire({
        icon: 'error',
        title: 'Miising Field',
        text: `You havent added any comment!`,
        showConfirmButton:false,
      })
      return
    }
    this.comment.editComment(this.e_input,id).subscribe({
      next:(res)=>{
        this.e_input=''
        this.comments=res.comments
      }
    })

  }

  deleteComment(comment: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Your comment and its replies will be gone!',
      confirmButtonText: 'I am sure',
      showCancelButton:true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.comment.deleteComment(comment).subscribe({
          next:(res)=>{
            Swal.fire('Deleted successfully', '', 'success')
            this.comments=res.comments
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Error deleting', '', 'info')
      }
    })

  }
}
