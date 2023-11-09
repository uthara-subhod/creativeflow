import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

declare let Razorpay: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:any[]=[]
  constructor(private profile: ProfileService, private pays: PaymentService) { }
  user:any
  ngOnInit(): void {
    this.pays
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();

    this.profile.getDashboard().subscribe({
      next:(res)=>{
        this.user=res.user
        console.log(res.datas)
        this.barChartLabels = res.labels
        this.barChartData = [{
            label: 'Number of votes',
            data: res.datas, // Sales for last month
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
            borderColor: 'rgba(75, 192, 192, 1)', // Border color
            borderWidth: 1, // Border width
          },
        ]
        this.books=res.books
        this.artworks=res.artworks

      },error:(err)=>{
        console.log(err.error.msg)
      }
        })

  }
  options = {
    "key": "",
    "subscription_id": "",
    "handler":(response:any)=>{}
  }

  books=0
  artworks=0
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 30,
  };

  public barChartLabels: string[] = []
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = []

  pay() {
    this.profile.plan('paid').subscribe({
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

      this.user.plan="premium"
      Swal.fire(
        'Payment Success!',
        'You have successfully subscribed!',
        'success'
      )
    },
    error: (err) => {
      console.log(err)
    }
  })
}
}
