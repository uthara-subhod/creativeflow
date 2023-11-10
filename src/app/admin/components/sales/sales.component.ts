import { Component, ElementRef, ViewChild } from '@angular/core';

import {jsPDF} from 'jspdf'
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
@ViewChild('sales')sales!: ElementRef;
tableData:any[]=[]
makePdf() {
  let doc :any= new jsPDF();
  doc.html(this.sales.nativeElement,{
    x: 15,
		y: 10,
    width: 180, //target width in the PDF document
    windowWidth: 650 ,
    callback: function() {
     doc.save("sales.pdf");
  }});
}
constructor(private admin:AdminService){}

ngOnInit(){
  this.admin.getTransactions().subscribe({
    next:(res)=>
    this.tableData=res.data
  })
}
}
