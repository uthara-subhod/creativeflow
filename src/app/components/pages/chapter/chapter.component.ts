import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-b-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
})
export class BChapterComponent implements OnInit {
  comments:any
  count=0
  constructor(private users:UserService, private profile:ProfileService, private router:Router, private route:ActivatedRoute, private comment:CommentService, private browse:BrowseService, private sanitizer:DomSanitizer){}
  chapter:any
  book:any
  next:any
  user:any
  ngOnInit(): void {
    this.profile.getUser().subscribe({
      next:(res)=>{
        this.user=res.user
      }
    })
    let id=''
    this.route.paramMap.subscribe((params: any) => {
    id = params.get('id');
    if(id){
      this.browse.getChapter(id).subscribe({
        next:(res)=>{
          this.chapter=res.chapter
          const content = res.chapter.content
          this.chapter.content = this.sanitizer.bypassSecurityTrustHtml(content);
          this.book=res.chapter.book
          this.browse.getBook(this.book.book_id).subscribe({
            next:(res)=>{
              this.book=res.book
              const current = res.book.chapters.filter((ch)=>{return ch.chapter_id==this.chapter.chapter_id})
              const index = res.book.chapters.indexOf(current[0])
              if(index<this.book.chapters.length-1&&index>=0){
                const nindex = index+1
                console.log(this.book.chapters[nindex])
                this.next = this.book.chapters[nindex]
              }else{
                this.next=null
              }
            }
          })

        },
        error:()=>{
          this.router.navigate(['/browse/books'])
        }
      })
      this.comment.getComments(id).subscribe({
        next:(res)=>{
          this.comments = res.comments
        },
        error:()=>{
          this.comments =[]
        }
      })
    }else{
      this.router.navigate(['/browse/books'])
    }
  });
}

vote(){
  this.users.voteChapter(this.chapter.chapter_id,!this.chapter.votes.includes(this.user._id)).subscribe({
    next:(res)=>{
      this.chapter=res.chapter
    }
  })
}

findCount(c){
  this.count = c
}

  }

