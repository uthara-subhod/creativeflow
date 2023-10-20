import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit{
  users:any[]=[]
  searchQuery=''
  constructor(private profile:ProfileService, private router:Router){}
  ngOnInit(): void {
    this.profile.getUsers().subscribe({
      next: (res: any) => {
        this.users=res.users
      },
      error: (err) => {
        this.router.navigate(['/error'])
      }
    })
  }

  get searchUsers() {
    return this.users.filter(user =>
      user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
}
