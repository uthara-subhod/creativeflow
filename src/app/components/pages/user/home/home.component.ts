import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { BrowseService } from 'src/app/services/browse.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @ViewChild('book') book!: ElementRef;
  scrollDistance = 850;
  @ViewChild('art') art!: ElementRef;
  constructor(private browse: BrowseService){
    this.calculateScrollDistance();
  }
  books:any
  artworks:any

  calculateScrollDistance() {
    // Calculate the scroll distance based on the viewport width
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) {
      this.scrollDistance = 320; // Set a smaller scroll distance for mobile devices
    } else {
      this.scrollDistance = 850; // Set a larger scroll distance for larger screens
    }
  }
  ngOnInit(): void {
      this.browse.getBooks().subscribe({
        next:(res)=>{
          this.books= res.books
        }
      })
      this.browse.getArtworks().subscribe({
        next:(res)=>{
          this.artworks= res.artworks
        }
      })
  }

  scrollLeft() {
    this.book.nativeElement.scrollBy({
      left: -this.scrollDistance,
      behavior: 'smooth',
    });
  }

  leftArt(){
    this.art.nativeElement.scrollBy({
      left: -this.scrollDistance,
      behavior: 'smooth',
    });
  }

  rightArt(){
    this.art.nativeElement.scrollBy({
      left: this.scrollDistance,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.book.nativeElement.scrollBy({
      left: this.scrollDistance,
      behavior: 'smooth',
    });
  }

}
