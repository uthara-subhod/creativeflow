import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { NavbarComponent } from '../../navbar/navbar.component';

import { AdminService } from 'src/app/services/admin.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-m-list',
  templateUrl: './m-list.component.html',
  styleUrls: ['./m-list.component.css'],


})
export class MListComponent {
  customers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private adminService: AdminService, private user:ProfileService) {}

  dataSource: any[] = [];
  displayedColumns: string[] = ['joinedAt', 'name', 'email']; // Customize with your data columns


  ngOnInit(): void {
    this.user.getUsers().subscribe({
      next:(res)=>{
        this.dataSource=res.users
      }
    })
  }

  getStatus(stat:boolean):string{
    if(stat){
      return 'Active'
    }else{
      return 'Blocked'
    }
  }

  delete(id:string){
   
  }




}
