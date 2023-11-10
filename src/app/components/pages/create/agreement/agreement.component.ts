import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  commission:any
  agrees=false
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
  details:string =''
  amount:string | number= ''
  constructor(private provider:ProviderService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    let id=''
    this.route.paramMap.subscribe((params: any) => {
    id = params.get('service_id');
    if(id){

      this.provider.getCommission(id).subscribe({
        next:(res)=>{
          this.commission=res.commission
          this.details=res.commission.details
          this.amount = res.commission.amount
          if(res.commission.agree1){
            this.agrees=res.commission.agree1
          }else{
            this.agrees=false
          }
        },error:()=>{
          this.router.navigateByUrl('/create')
        }
      })
    }
    })
  }

  save(){
    const regex = /^\d+(\.\d{1,2})?$/
    this.details=this.details.trim()
    if(!regex.test(this.amount as string)){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Format',
        text: `Amount should be valid amount`,
        showConfirmButton: false,
      })
      return
    }
    this.amount= Number(this.amount)
    const data = {
      details:this.details,
      amount:this.amount
    }
    this.provider.editCommission(data,this.commission.commission_id).subscribe({
      next:(res)=>{
        this.Toast.fire({
          icon: "success",
          title: "Edited Successfuly!",
      })
      },error:(err:any)=>{
        console.log(err.error.msg)
      }
    })
  }

  agree(){
    Swal.fire({
      icon:"info",
      title:"Are you sure?",
      text:"Agreeing to this makes this available for the customer to see and agree",
      confirmButtonText: 'I am sure',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const regex = /^\d+(\.\d{1,2})?$/
        this.details=this.details.trim()
        if(this.details==''||this.amount==''){
          Swal.fire({
            icon: 'error',
            title: 'Empty fields',
            text: `Fields cannot be empty`,
            showConfirmButton: false,
          })
          return
        }
        if(!regex.test(this.amount as string)){
          Swal.fire({
            icon: 'error',
            title: 'Invalid Format',
            text: `Amount should be valid amount`,
            showConfirmButton: false,
          })
          return
        }
        this.amount= Number(this.amount)
        const data = {
          details:this.details,
          amount:this.amount,
          agree1:this.agrees
        }
        this.provider.editCommission(data,this.commission.commission_id).subscribe({
          next:(res)=>{
            this.Toast.fire({
              icon: "success",
              title: "Edited Successfuly!",
          })
          }
        })
      }else{
        this.agrees=false
      }
    })

  }
}
