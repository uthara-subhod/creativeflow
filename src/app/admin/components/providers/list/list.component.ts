import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PListComponent implements OnInit, OnChanges, AfterViewInit {
  tableData: any
  pr:any
  type = ''
  id = ''
  approved:boolean |null = null
  dataSource = new MatTableDataSource<any>([]); // Replace 'any' with your data type


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private admin: AdminService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      this.dataSource.data = this.tableData;
    }
    this.dataSource.data = this.tableData;


  }


  ngOnInit(): void {
    this.admin.fetchTable('providers').subscribe({
      next: (res) => {
        this.tableData = res.data
        this.dataSource.data = this.tableData;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  openModal(id: string) {
    this.pr= this.tableData.filter((p)=>{return p.provider_id=id})[0]
    console.log(this.pr)
    if(this.pr.approved==true||this.pr==false){
      this.approved=this.pr.approved
    }
    this.id = id
  }

  submit(){
    if(this.approved==null){


        Swal.fire({
          icon: 'error',
          title: 'Fields cannot be empty',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        });
        return;
    
    }
    this.admin.editProvider(this.id,this.approved).subscribe({
      next:(res)=>{
        this.ngOnInit()
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
