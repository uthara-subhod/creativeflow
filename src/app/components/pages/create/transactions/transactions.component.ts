import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateService } from 'src/app/services/create.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  tableData: any
  displayedColumns: any[] = ['Transaction ID', "Payment ID", 'Buyer',  'Total', "Item", "Date", ]
  columns = ['transaction_id', 'paymentID', 'buyer', 'amount', 'detail','createdAt'];
  actions = ['Edit']
  type = ''
  id = ''
  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type
  constructor(private create:CreateService){}


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      // Assuming you have fetched new data and stored it in newDataArray
      this.dataSource.data = this.tableData;
    }
    this.dataSource.data = this.tableData;
    console.log("hi",this.dataSource)


  }


ngOnInit(): void {
this.create.transactions().subscribe({
  next:(res)=>{
    this.tableData=res.data
    console.log(res.data)
    this.dataSource.data = this.tableData;
  }
})
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

status(status, id){
this.create.status(status,id).subscribe({
  next:(res)=>{
    this.ngOnInit()
  }
})
}


}
