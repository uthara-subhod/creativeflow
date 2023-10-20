import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-slist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SListComponent {
  data:any
  display=['Cover','Name']
  columns=['cover','name'];
  constructor(private admin:AdminService){}
ngOnInit(): void {
  this.admin.fetchTable('artfields').subscribe({
    next:(res)=>{
      this.data=res.data
    }
  })
}
}
