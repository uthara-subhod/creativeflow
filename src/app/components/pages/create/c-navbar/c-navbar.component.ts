import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-navbar',
  templateUrl: './c-navbar.component.html',
  styleUrls: ['./c-navbar.component.css']
})
export class CNavbarComponent{
  @Input() book: any
  @Input() chapter: any;

  constructor(private create:CreateService, private route:ActivatedRoute, private router:Router){}
  save() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      });
      const currentRoute = this.router.url;
      if (currentRoute === `/create/book/${this.book.book_id}`) {
        this.book.title=this.book.title.trim()
        this.book.description= this.book.description.trim()
        const data =this.book
        if(this.book.cover=='../../../../../assets/images/cover-dummy.jpg'){
          data.cover = ''
        }
        if(this.book.title==''){
          Swal.fire({
            icon: 'error',
            title: 'Title Cant be empty!',
            showConfirmButton:false,
          })
          if(this.book.cover=''){
            this.book.cover='../../../../../assets/images/cover-dummy.jpg'
          }

          return
        }
        let id =''
        this.route.params.subscribe(params => {
          id = params['id'];
        });
        if(id){
          this.create.saveBook(data).subscribe({
            next:(res)=>{
          if(this.book.cover==''){
            this.book.cover='../../../../../assets/images/cover-dummy.jpg'
          }

          Toast.fire({
            icon: "success",
            title: "Book saved successfully",
        })
        }
      })
    }
    }else{
      this.chapter.title=this.chapter.title.trim()
      if(this.chapter.title==''){
        Swal.fire({
          icon: 'error',
          title: 'Title Cant be empty!',
          showConfirmButton:false,
        })
        return
      }
      const data=this.chapter
      let id =''
        this.route.params.subscribe(params => {
          id = params['id'];
        });
        if(id){
          this.create.saveChapter(data).subscribe({
            next:(res)=>{
          Toast.fire({
            icon: "success",
            title: "Chapter saved successfully",
        })
        }
      })
    }

  }
}
  togglepublish() {
    const currentRoute = this.router.url;
    if (currentRoute === `/create/book/${this.book.book_id}`) {
    if(!this.book.published){
      if(!this.book.copyright || this.book.copyright == '' || !this.book.category ||this.book.category==''|| this.book.title==''|| this.book.language==''){
        Swal.fire({
          icon: 'error',
          title: 'Miising Fields',
          text: `You havent added all details for your book!`,
          showConfirmButton:false,
        })
        return
      }
      if (this.book.chapters.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'No chapters!',
          text: `You can't publish with no chapters!`,
          showConfirmButton:false,
        })
        return
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure?',
          text: 'All your chapters will be published together!',
          confirmButtonText: 'I am sure',
          showCancelButton:true
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.create.publishBook(this.book).subscribe({
              next:(res)=>{
                this.book=res.book
                Swal.fire('Published successfully', '', 'success')
              },
              error:()=>{

                Swal.fire('Error publishing', '', 'error')
              }
            })
          } else if (result.isDenied) {
            Swal.fire('Error publishing', '', 'info')
          }
        })
      }
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'All your chapters will be unpublished together!',
        confirmButtonText: 'I am sure',
        showCancelButton:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.unpublishBook(this.book).subscribe({
            next:(res)=>{
              this.book=res.book
              Swal.fire('Unpublished successfully', '', 'success')
            },
            error:()=>{

              Swal.fire('Error unpublishing', '', 'error')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Error unpublishing', '', 'info')
        }
      })
    }
  }else{
    if(!this.chapter.published){
      if(!this.book.copyright || this.book.copyright == '' || !this.book.category ||this.book.category==''|| this.book.title==''|| this.book.language==''){
        Swal.fire({
          icon: 'error',
          title: 'Miising Fields',
          text: `You havent added all details for your book!`,
          showConfirmButton:false,
        })
        return
      }
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This chapter will be made public',
        confirmButtonText: 'I am sure',
        showCancelButton:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.publishChapter(this.chapter).subscribe({
            next:(res)=>{
              this.chapter=res.chapter
              Swal.fire('Published successfully', '', 'success')
            },
            error:()=>{

              Swal.fire('Error publishing', '', 'info')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Chapter not published', '', 'info')
        }
      })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This chapter will be unpublished',
        confirmButtonText: 'I am sure',
        showCancelButton:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.unpublishChapter(this.chapter).subscribe({
            next:(res)=>{
              this.chapter=res.chapter
              Swal.fire('Published successfully', '', 'success')
            },
            error:()=>{

              Swal.fire('Error publishing', '', 'info')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Chapter not published', '', 'info')
        }
      })
    }
  }
  }
  delete() {
    const currentRoute = this.router.url;
    if (currentRoute === `/create/book/${this.book.book_id}`) {
    if (this.book.chapters.length !== 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This book contains one or more chapters. Once you delete, its gone!',
        confirmButtonText: 'I am sure',
        showCancelButton:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.deleteBook(this.book).subscribe({
            next:(res)=>{

              Swal.fire('Deleted successfully', '', 'success').then(()=>{
                this.router.navigate([`/create`])
                ///book/${this.book.book_id}
              })
            },
            error:()=>{

              Swal.fire('Error deleting', '', 'info')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Not deleted', '', 'info')
        }
      })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Once you delete, its gone!',
        confirmButtonText: 'I am sure',
        showCancelButton:true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.deleteBook(this.book).subscribe({
            next:(res)=>{

              Swal.fire('Deleted successfully', '', 'success').then(()=>{
                this.router.navigate([`/create`])
                ///book/${this.book.book_id}
              })
            },
            error:()=>{

              Swal.fire('Error deleting', '', 'info')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Not deleted', '', 'info')
        }
      })
    }
  }else{
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Once you delete, its gone!',
      confirmButtonText: 'I am sure',
      showCancelButton:true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.create.deleteChapter(this.chapter).subscribe({
          next:(res)=>{

            Swal.fire('Deleted successfully', '', 'success').then(()=>{
              this.router.navigate([`/create`])
              ///book/${this.book.book_id}
            })
          },
          error:()=>{

            Swal.fire('Error deleting', '', 'info')
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Not deleted', '', 'info')
      }
    })
  }
  }

}
