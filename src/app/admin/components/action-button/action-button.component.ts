import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {
  @Input() type =''
  @Input() id =''
  @Input() color=''
  @Input() action =''

  constructor(private router:Router, private admin:AdminService){}
  btnClick(id:any){
    if(this.type=='users'){
      this.admin.editUser(id).subscribe({
        next:(res)=>{
          this.admin.changes()
        }
      })
    }else{
      this.action = this.action.toLowerCase()
      this.router.navigate([`/behindflow/${this.type}/${this.id}/${this.action}`])
    }
  }
}
