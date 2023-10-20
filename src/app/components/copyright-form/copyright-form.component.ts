import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';
import { BrowseService } from 'src/app/services/browse.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-copyright-form',
  templateUrl: './copyright-form.component.html',
  styleUrls: ['./copyright-form.component.css']
})
export class CopyrightFormComponent implements OnInit {
  constructor(private router:Router, private route:ActivatedRoute, private browse: BrowseService,
     private profile:ProfileService, private users:UserService){}
  image = false;
  images: any[] = []
  links:any[]=[]
  link=''
  item=''
  item_id=''
  description=''
  violation=''
  options: UploadWidgetConfig = {
    apiKey: 'free', // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 5,
    editor: {
      images: {
        crop: true,
        cropShape: 'rect',
        preview: true,
      },
    },
    mimeTypes: ['image/jpeg', 'image/png', 'image/avif'],
  };

  ngOnInit(): void {
    let id=''
    this.route.paramMap.subscribe((params: any) => {
    if(params.get('book_id')){
      id=params.get('book_id')
      this.item='book'
      this.browse.getBook(id).subscribe({
        next:(res)=>{
          this.item_id=res.book._id
        },
        error:()=>{
          this.router.navigate(['/error'])
        }
      })
    }else if(params.get('chapter_id')){
      id=params.get('chapter_id')
      this.item='chapter'
      this.browse.getChapter(id).subscribe({
        next:(res)=>{
          this.item_id=res.chapter._id
        },
        error:()=>{
          this.router.navigate(['/error'])
        }
      })
    }else if(params.get('artwork_id')){
      id=params.get('artwork_id')
      this.item='artwork'
      this.browse.getArtwork(id).subscribe({
        next:(res)=>{
          this.item_id=res.artwork._id
        },
        error:()=>{
          this.router.navigate(['/error'])
        }
      })
    }else if(params.get('user_id')){
      id=params.get('user_id')
      this.item='artwork'
      this.profile.isValid(id).subscribe({
        next:(res)=>{
          this.item_id=res.user._id
        },
        error:()=>{
          this.router.navigate(['/error'])
        }
      })
    }
  });
  }

  onComplete = (files: UploadWidgetResult[]) => {
    this.images = files.filter((file) => { return file.fileUrl && file.fileUrl != '' })
    if (this.images.length != 0) {
      this.image = true;
    }
  };

  addLink() {
    if (this.link.trim() !== '') {
      this.links.push(this.link.trim());
      this.link = '';
    }
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addLink();
    }
  }

  removeLink(link){
    this.links=this.links.filter((l)=>{return l!=link})
  }

  submit(){
    this.violation=this.violation.trim()
    this.description=this.description.trim()
    if(this.violation==''||this.description==''||this.links.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Miising Fields',
        text: `You havent added all details to make the report!`,
        showConfirmButton: false,
      })
      return
    }
    const data:any = {
      violation:this.violation,
      description:this.description,
      links:this.links,
      item:this.item
    }
    console.log(data)
    if(this.item=='book'){
      data.book_id=this.item_id
    }else if(this.item=='chapter'){
      data.chapter_id =this.item_id
    }else if(this.item=='artwork'){
      data.artwork_id=this.item_id
    }else if(this.item=='user'){
      data.user_id=this.item_id
    }
    this.users.report(data).subscribe({
      next:(res)=>{
        Swal.fire('Report Submitted succesfully!', '', 'success')
        this.ngOnInit()
      },
      error:(err:any)=>{
        Swal.fire(err.error.msg, '', 'error')
      }
    })

  }
}
