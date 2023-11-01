import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
  links: any[] = []
  link = ''
  title = ''
  description = ''
  services: any
  service = ''
  minPrice: number = 0;
  maxPrice: number = 1;
  deliveryTime='';

  constructor(private user: UserService, private profile: ProfileService, private route: Router) { }

  ngOnInit(): void {
    this.user.categories('services').subscribe({
      next: (res) => {
        this.services = res.data
      }
    })
  }
  addLink() {
    if (this.link.trim() !== '') {
      this.links.push(this.link.trim());
      this.link = '';
    }
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addLink();
    }
  }

  removeLink(link) {
    this.links = this.links.filter((l) => { return l != link })
  }
  submit() {
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
      const data = {
        title:this.title,
        description:this.description,
        lower:this.minPrice,
        higher:this.maxPrice,
        service:this.service,
        deliveryTime:this.deliveryTime,
        links:this.links
      }
    if (this.title==''||this.description==''||this.minPrice<=0||this.maxPrice<this.minPrice||this.deliveryTime==''){

      Swal.fire({
        icon: 'error',
        title: 'Miising Fields',
        text: `You havent added all details!`,
        showConfirmButton: false,
      })
      return
    }

    this.user.provider(data).subscribe({
      next:(res)=>{
        Toast.fire({
          icon: "success",
          title: "Application registered successfully",
      })
      }
    })
  }
}
