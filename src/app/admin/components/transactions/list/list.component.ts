import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TListComponent {
  tableData: any
  displayedColumns: any[] = ['Transaction ID', "Payment ID", 'Buyer', 'Seller', 'Total', "Item", "Date", ]
  columns = ['transaction_id', 'paymentID', 'buyer', 'seller', 'amount', 'detail','createdAt'];
  actions = ['Pay']
  type = ''
  id = ''
  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type
  constructor(private admin:AdminService){}


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


  }


ngOnInit(): void {
this.admin.getTransactions().subscribe({
  next:(res)=>{
    this.tableData=res.data
    this.dataSource.data = this.tableData;
  }
})
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

pay(id){
this.admin.pay(id).subscribe({
  next:(res)=>{
    this.ngOnInit()
  }
})
}

}
