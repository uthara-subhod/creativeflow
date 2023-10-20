import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  isArtist: boolean = false;
  isAuthor: boolean = false;
  userType: boolean = false;
  constructor(private profile:ProfileService,  private router: Router){}
  submit(){
    if(!this.isArtist&&!this.isAuthor){
      Swal.fire({
        icon: 'error',
        title: 'You have to choose either artist or author',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      return
    }
    const data = {
      artist:this.isArtist,
      author:this.isAuthor,
      pro:this.userType
    }

    this.profile.roles(data).subscribe({
      next:(res)=>{
        this.router.navigate(['/create'])
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        })
      }
    })

  }
}
