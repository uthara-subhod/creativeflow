import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

declare let Razorpay: any;

@Component({
  selector: 'app-request-agree',
  templateUrl: './request-agree.component.html',
  styleUrls: ['./request-agree.component.css']
})
export class RequestAgreeComponent {
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

  constructor(private provider:ProviderService, private route:ActivatedRoute, private pays:PaymentService, private router:Router){}
  ngOnInit(): void {
    this.pays
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();

    let id=''
    this.route.paramMap.subscribe((params: any) => {
    id = params.get('request_id');
    if(id){

      this.provider.getCommission(id).subscribe({
        next:(res)=>{
          this.commission=res.commission
          this.agrees=res.commission.agree2
          if((res.commission.paymentOrder||res.commission.agree2)&&res.commission.paid==false){
            let options = {
              "key": "",
              "payment_id": res.commission.paymentOrder,
              "amount":this.commission.amount*100,
              "handler":(response:any)=>{}

            }
            options.key=res.key_id
            options['handler'] = this.razorPaySuccessHandler.bind(this);

            let razorpay = new Razorpay(options)
            razorpay.open();
          }
        },error:()=>{
          this.router.navigateByUrl('/profile/edit')
        }
      })
    }
    })
  }

  agree(){
    Swal.fire({
      icon:"info",
      title:"Are you sure?",
      text:"You can't take back your agreement once you do this",
      confirmButtonText: 'I am sure',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let options = {
          "key": "",
          "payment_id": "",
          "amount":this.commission.amount*100,
          "handler":(response:any)=>{}
        }
        this.provider.agreeCommission(this.commission.commission_id).subscribe({
          next:(res)=>{

            options.key=res.key_id
              options.payment_id=res.order_id
              options['handler'] = this.razorPaySuccessHandler.bind(this);

              let razorpay = new Razorpay(options)
              razorpay.open();
        }})
      }else{
        this.agrees=false
      }
    })

  }

  async razorPaySuccessHandler(response:any) {
    var paymentId = response.razorpay_payment_id;
    this.provider.payCommission(this.commission.commission_id,paymentId).subscribe({
      next:(res)=>{
      }
    })

  }

}
