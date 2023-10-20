import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModeratorService } from 'src/app/services/moderator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges, AfterViewInit, OnInit{
  tableData: any
  displayedColumns: any[] = ['Reporter','Item', 'Status', 'Reported Date', "Resolved Date", "Action taken"]
  columns= ['reporter', 'item','resolved','reported_date', 'resolved_date', 'action'];
  actions = ['view']
  type = ''
  id = ''
  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type

  constructor(private mod:ModeratorService){}


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
this.mod.getReports().subscribe({
  next:(res)=>{
    this.tableData=res.reports
    this.dataSource.data = this.tableData;
  }
})
}

ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
}
