import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit{
list:any
isEmpty=true
constructor(private user:UserService){}
ngOnInit(): void {
    this.user.getLibrary().subscribe({
      next:(res)=>{
        this.isEmpty=res.isEmpty
        if(!this.isEmpty){
          this.list=res.data.books
          console.log(this.list)
        }
      }
    })
}
}
