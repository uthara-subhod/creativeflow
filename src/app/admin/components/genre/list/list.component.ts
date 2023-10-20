import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-glist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GListComponent {
  display=['Cover','Name']
  columns=['cover','name'];

  data:any
  constructor(private admin:AdminService){}
ngOnInit(): void {
  this.admin.fetchTable('genres').subscribe({
    next:(res)=>{
      this.data=res.data
    }
  })

}
}
