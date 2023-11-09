import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.css']
})
export class BookCardsComponent implements OnInit {
  @Input() books: any[] = [];
  firstIndex = 0
  lastIndex = 3
  pageSize = 9
  ngOnInit(): void {
    this.lastIndex=this.pageSize
  }
  pageEvent(event) {
    this.firstIndex = this.paginator.pageIndex * this.paginator.pageSize
    this.lastIndex = (this.paginator.pageIndex + 1) * this.paginator.pageSize
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  obs: Observable<any> | any;
  dataSource: MatTableDataSource<any> | any
  constructor(private changeDetectorRef: ChangeDetectorRef) { }



}
