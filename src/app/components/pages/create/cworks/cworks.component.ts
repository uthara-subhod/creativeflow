import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';

@Component({
  selector: 'app-cworks',
  templateUrl: './cworks.component.html',
  styleUrls: ['./cworks.component.css']
})
export class CworksComponent implements OnInit{
  constructor(private createService:CreateService, private router:Router){}
  isBook=true
  newBookTitle = '';
  books: any[] = [
  ];
  publishedBooks: any[] = [];
  unpublishedBooks: any[] = [];
  publishedArt:any[]=[]
  unpublishedArt:any[]=[]

  ngOnInit(): void {
      this.createService.books().subscribe({
        next:(res)=>{
          const books=res.books as any[]
          this.publishedBooks = books.filter((book) => book.published === true);
          this.unpublishedBooks = books.filter((book) => book.published !== true);
        }
      })
      this.createService.artworks().subscribe({
        next:(res)=>{
          const artworks=res.artworks as any[]
          this.publishedArt = artworks.filter((art) => art.published === true);
          this.unpublishedArt = artworks.filter((art) => art.published !== true);
        }
      })
  }

  create(){
    const book = {title:"Untitled"}
    this.createService.createBook(book).subscribe({
      next:(res)=>{
        this.router.navigate([`/create/book/${res.book.book_id}`])
      },
      error:()=>{
        console.log("oops")
      }
    })

  }

  artwork(){
    const artwork = {title: 'Untitled'}
    this.createService.createArtwork(artwork).subscribe({
      next:(res)=>{
        this.router.navigate([`/create/artwork/${res.artwork.artwork_id}`])
      },
      error:()=>{
        console.log("oops")
      }
    })
  }

  page(id:string){
    this.router.navigate([`/create/book/${id}`])
  }

  choose(val:boolean){
    this.isBook=val
  }
}
