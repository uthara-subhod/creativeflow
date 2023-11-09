import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css']
})
export class CommissionListComponent implements OnInit{
  Toast = Swal.mixin({
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
  data:any[]=[]
  firstIndex = 0
  lastIndex = 3
  pageSize = 5
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private provider:ProviderService){}
  ngOnInit(): void {
      this.provider.vendorRequests().subscribe({
        next:(res)=>{
          this.data=res.data
        }
      })
  }
  pageEvent(event) {
    this.firstIndex = this.paginator.pageIndex * this.paginator.pageSize
    this.lastIndex = (this.paginator.pageIndex + 1) * this.paginator.pageSize
  }

  status(stat:string, id:string){

    Swal.fire({
      icon:"info",
      title:"Are you sure?",
      text:"You will be permenantly altering this commission's status",
      confirmButtonText: 'I am sure',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.provider.approveCommission(stat,id).subscribe({next:(res)=>{
          this.Toast.fire({
            icon: "success",
            title: "Edited Successfuly!",
        })
          this.ngOnInit()
        }})
      } 
    })
  }
}
