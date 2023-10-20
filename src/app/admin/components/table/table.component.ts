import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements  OnInit, OnChanges, AfterViewInit{
  @Input() tableData :any
  @Input() displayedColumns:any[] =[]
  @Input() columns:any[] =[]
  @Input() actions:any
  @Input() type=''
  @Input() id = ''
  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      // Assuming you have fetched new data and stored it in newDataArray
      this.dataSource.data = this.tableData;
    }
    this.dataSource.data = this.tableData;
    console.log("hi",this.dataSource)


  }


ngOnInit(): void {

}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

}
