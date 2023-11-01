import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


declare let Razorpay: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  constructor(private router:Router,private profile:ProfileService, private pays: PaymentService, private route:ActivatedRoute, private browse:BrowseService, private user: UserService){}
  book:any
  account:any
  words = 0
  votes = 0
  ngOnInit(): void {
    this.pays
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
      this.profile.getUser().subscribe({
        next:(res)=>{
          this.account=res.user
        }
      })
    let id=''
      this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });
    if(id!=''){
      this.browse.getBook(id).subscribe({
        next:(res)=>{
          this.book=res.book
          this.book.chapters.forEach((ch)=>{
            this.words+=ch.words
            this.votes+=ch.votes.length
          })
        },
        error:()=>{
          this.router.navigate(['/browse/books'])
        }
      })
    }else{
      this.router.navigate(['/browse/books'])
    }
  }

  pay(){
    if(this.book.author.user_id==this.account.user_id){
      Swal.fire({
        icon:"info",
        title:"You are the author",
        text:"You already own this book"
      })
      return
    }
    this.user.paidBook(this.book.book_id).subscribe({
      next:(res)=>{
        if(res.status){
          Swal.fire({
            icon:"info",
            title:"You already brought this",
            text:"You can go to your library to read this!"
          })
          return
        }else{
          const data = {
            _id:this.book.book_id,
            price:this.book.pricing
          }
          this.pays.buy(data).subscribe({
            next:(res)=>{
              let options = {
                "key": "",
                "payment_id": "",
                "amount":res.amount*100,
                "handler":(response:any)=>{}
              }
              options.key=res.key_id
                options.payment_id=res.order_id
                options['handler'] = this.razorPaySuccessHandler.bind(this);

                let razorpay = new Razorpay(options)
                razorpay.open();
            }
          })
        }
      }
    })

  }

  async razorPaySuccessHandler(response:any) {
    var paymentId = response.razorpay_payment_id;
    var payload = {
      seller:this.book.author.user_id,
      paymentID: paymentId,
      amount: this.book.pricing,
      detail: "Book,"+this.book.book_id
    };
    this.pays.transaction(payload).subscribe({
      next: (res) => {
        this.user.buyBook(this.book.book_id).subscribe({
          next:(res)=>{

          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
