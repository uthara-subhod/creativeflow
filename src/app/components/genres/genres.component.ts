import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  @ViewChild('banners') banners: ElementRef |any;
  @Input() type =''
  @Output() cardClick = new EventEmitter<string>();
  genres:any

  constructor(private user:UserService){}

  ngOnInit(): void {
    this.user.categories(this.type).subscribe({
      next:(res)=>{
        this.genres=res.data
      }
    })

  }

  scrollDistance = 600; // Adjust the scroll distance as needed

  scrollLeft() {
    this.banners.nativeElement.scrollBy({
      left: -this.scrollDistance,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.banners.nativeElement.scrollBy({
      left: this.scrollDistance,
      behavior: 'smooth',
    });
  }

  filter(cat:string){

    this.cardClick.emit(cat);
  }
}

