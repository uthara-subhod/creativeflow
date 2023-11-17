import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PaymentService } from 'src/app/services/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ProviderService } from 'src/app/services/provider.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  firstIndex = 0
  lastIndex = 3
  pageSize = 5
  requests:any[]=[]
  id=''
  user = {
    fullname:'',
    profile:'',
    country:'',
    bio:'',
    banner:'',
    email:''
  }
  plan:any
  isAcount=false
  account = {
    bank:'',
    beneficiary:'',
    acc:0
  }
  countries: any[] = [];
  error=false
  msg =''
  // 304030434
  tableData: any[]=[]
  displayedColumns: any[] = ['Transaction ID', "Payment ID", 'Seller',  'Total', "Item", "Date" ]
  columns = ['transaction_id', 'paymentID', 'seller', 'amount', 'detail','createdAt'];
  actions = ['Download']
  tabs = [
    { title: 'Edit Profile', active: false },
    { title: 'Transactions', active: false },
    { title: 'Requested Services', active: false },
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  uploadedFileUrl: string = '../../../assets/images/dummy-image.jpeg';
  following:boolean=false


  constructor(private profile:ProfileService,private provider:ProviderService, private route:ActivatedRoute, private router:Router, private pay:PaymentService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      this.tabs[tab].active=true
      if(!tab){
        this.tabs[0].active=true
      }
    });
    this.profile.getUser().subscribe({
      next:(res)=>{
        this.id=res.user.user_id
        this.user.fullname=res.user.fullname
        this.user.profile=res.user.profile
        this.user.country = res.user.country
        this.user.bio = res.user.bio
        this.user.email=res.user.email
        this.plan = res.user.plan
        this.user.banner=res.user.banner
        if(res.user.account_id){
          this.isAcount=true
        }
        this.profile.getTransactions().subscribe({
          next:(res)=>{
            this.tableData=res.data
          }
        })
        this.provider.clientRequests().subscribe({
          next:(res)=>{
            this.requests=res.data
          }
        })

      }
    })

    this.getCountries().then((data: any) => {
      this.countries = data;
    })


  }
  options: UploadWidgetConfig = {
    apiKey: "free", // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
    "editor": {
      "images": {
        "crop": true,
        "cropRatio": 1,
        "cropShape": "circ",
        "preview": true
      }
    },
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/avif"
    ]
  };

  option2: UploadWidgetConfig = {
    apiKey: "free", // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
    "editor": {
      "images": {
        "crop": true,
        "cropRatio": 1905/300,
        "cropShape": "rect",
        "preview": true
      }
    },
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/avif"
    ]
  };

  //1905X300
  onComplete = (files: UploadWidgetResult[]) => {
    if(files[0]?.fileUrl){

      this.uploadedFileUrl = files[0]?.fileUrl;
      this.user.profile = this.uploadedFileUrl
    }
  };

  bannerComplete= (files: UploadWidgetResult[]) => {
    if(files[0]?.fileUrl){
      this.user.banner = files[0]?.fileUrl;
    }
  };

  pageEvent(event) {
    this.firstIndex = this.paginator.pageIndex * this.paginator.pageSize
    this.lastIndex = (this.paginator.pageIndex + 1) * this.paginator.pageSize
  }

  selectTab(tab: any): void {
    const i = this.tabs.indexOf(tab)
    this.tabs.forEach(t => (t.active = false)); // Deselect all tabs
    tab.active = true; // Select the clicked tab
    this.router.navigateByUrl(`/profile/edit?tab=${i}`)

  }
  // HDFC0001524


  async getCountries(){
    const url = 'https://restcountries.com/v3.1/all'
    try {
      const response = await axios.get(url);
      this.countries=response.data;
      return response.data
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw error;
    }
  }

  submit(){
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
    this.user.fullname=this.user.fullname.trim()
    if(this.user.fullname===''){
      this.msg=`Fullname cannot be emptry. Please try again.`
      this.error=true;
      return
    }
    if(this.uploadedFileUrl!='../../../assets/images/dummy-image.jpeg'){
      this.user.profile=this.uploadedFileUrl
    }
    const data ={
      fullname:this.user.fullname,
      profile:this.user.profile,
      country:this.user.country,
      bio:this.user.bio,
      banner:this.user.banner
    }
    this.profile.editProfile(data).subscribe({
      next:(res)=>{
        Toast.fire({
          icon: "success",
          title: "Profile Edited successfully",
      })
      },
      error:(err)=>{
        alert(err.error.msg)
        console.log(err.error.msg)
      }
    })
  }

  close(){
    this.error=false
  }

  onCountryChange(selectedCountry: string) {
    this.user.country = selectedCountry;
  }

  cancel(){
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This artwork will be published!',
      confirmButtonText: 'I am sure',
      showCancelButton: true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.pay.cancel(this.id).subscribe({
          next:(res)=>{
            Swal.fire('Cancelled successfully', '', 'success')
            this.ngOnInit()
          }
        })
      } else if (result.isDenied) {
       return
      }
    })

  }

  generatePDF(tr:any,action:any) {
    console.log(tr)
    let docDefinition = {
      content: [
        {
          text: 'CreativeFlow',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.user.fullname,
                bold:true
              },
              { text: this.user.email },
            ],
            [
              {
                text: `Date: ${tr.createdAt}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${tr.transaction_id}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: ['auto', '*', 'auto'],

            body: [
              [ 'Seller', 'Product', 'Amount' ],
          [ `${tr.seller}`, `${tr.detail}`, `${tr.amount}`],
            ]
          }
        },
        {
          columns: [
            [{ qr: `${this.user.fullname}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order cannoted be returned.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };
    if(action=="view"){
      pdfMake.createPdf(docDefinition).open();
    }else{
      pdfMake.createPdf(docDefinition).download();
    }
  }

  status(id){
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
    this.provider.approveCommission("completed",id).subscribe({
      next:(res)=>{
        Toast.fire({
          icon:"success",
          title:"Congratulations! Your request hs been successfully delivered!"
        })
        this.ngOnInit()
      }
    })
  }


}
