import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProviderService } from 'src/app/services/provider.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
  title = ''
  description = ''
  vendor:any

  constructor(private browse:BrowseService, private provider:ProviderService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    let id =''
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
      if(id){
        this.browse.getProvider(id).subscribe({
          next:(res)=>{
            this.vendor=res.provider
          },
          error:()=>{
            this.router.navigate(['/browse/services'])
          }
        })
      }else{
        this.router.navigate(['/browse/services'])
      }
    });
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

      this.title= this.title.trim()
      this.description=this.description.trim()
      if(this.title==''|| this.description==''){
        Swal.fire({
          icon: 'error',
          title: 'Miising Fields',
          text: `You havent added all details!`,
          showConfirmButton: false,
        })
        return
      }
      const data = {
        title:this.title,
        description:this.description,
        provider:this.vendor._id,
        vendor:this.vendor.user._id
      }

      this.provider.hire(data).subscribe({
        next:(res)=>{
          Toast.fire({
            icon: "success",
            title: "Request send successfully",
        })
          this.router.navigate(['/browse/services'])
        },
        error:()=>{
          Toast.fire({
            icon: "error",
            title: "Error submitting request",
        })
        }
      })
  }
}
