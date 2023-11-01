import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

declare let Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  constructor(private pays: PaymentService, private user: ProfileService, private router: Router) { }
  ngOnInit() {
    this.pays
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }

  free() {
    this.user.plan('free').subscribe({
      next: (res) => {
        if (res.plan) {

          this.router.navigate(['/create/roles'])
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  options = {
    "key": "",
    "subscription_id": "",
    "handler":(response:any)=>{}
  }




  pay() {
    this.user.plan('paid').subscribe({
      next: (res) => {
        if (res.plan) {
          this.options.key=res.key_id
          this.options.subscription_id=res.id
          this.options['handler'] = this.razorPaySuccessHandler.bind(this);

          let razorpay = new Razorpay(this.options)
          razorpay.open();
            }
          },
      error: (err) => {
        console.log(err)
      }
    })




    // this.RAZORPAY_OPTIONS.amount = 100 + '00';
    // let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    // razorpay.open();
  }
 async razorPaySuccessHandler(response:any) {
    var paymentId = response.razorpay_payment_id;
    var payload = {
      paymentID: paymentId,
      amount: 499,
      detail: "Premium Plan"
    };
    this.pays.transaction(payload).subscribe({
      next: (res) => {
        Swal.fire(
          'Payment Success!',
          'You have successfully subscribed!',
          'success'
        )
          this.router.navigate(['/create/roles'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
