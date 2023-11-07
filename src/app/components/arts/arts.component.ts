import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent implements OnInit {
  @Input() artworks: any[] = []
  @Input() isPaginator = false
  artwork: any
  isLoggedIn = false
  user: any

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  obs: Observable<any> | any;
  dataSource: MatTableDataSource<any> | any
  constructor(private changeDetectorRef: ChangeDetectorRef, private auth: AuthService, private router: Router, private profile: ProfileService, private users: UserService) { }
  getArtwork(a) {
    if (this.isLoggedIn) {
      this.artwork = a
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please login to view the artwork',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      })
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    if (this.auth.getToken() != '' && this.auth.getToken()) {
      this.isLoggedIn = true
      this.profile.getUser().subscribe({
        next: (res) => {
          this.user = res.user
        }
      })
    }
    if (this.isPaginator) {

      this.dataSource = new MatTableDataSource<any>(this.artworks);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();


    } else {
      this.obs = this.artworks
    }
  }

  vote(artwork) {

    this.users.voteArt(artwork.artwork_id, !artwork.votes.includes(this.user._id)).subscribe({
      next: (res) => {
        this.artwork = res.artwork

      }
    })
  }
}
