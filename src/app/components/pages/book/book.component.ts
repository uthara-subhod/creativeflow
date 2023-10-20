import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  constructor(private router:Router, private route:ActivatedRoute, private browse:BrowseService){}
  book:any
  ngOnInit(): void {
    let id=''
      this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });
    if(id!=''){
      this.browse.getBook(id).subscribe({
        next:(res)=>{
          this.book=res.book
        },
        error:()=>{
          this.router.navigate(['/browse/books'])
        }
      })
    }else{
      this.router.navigate(['/browse/books'])
    }
  }
}
