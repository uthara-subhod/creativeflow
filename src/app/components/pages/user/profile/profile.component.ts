import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  isArt = true
  books: any[] = []
  artworks: any[] = []
  following: boolean = false
  artwork: any

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  obs: Observable<any> | any;
  obs2:Observable<any> | any;
  dataSource: MatTableDataSource<any> | any
  constructor(private changeDetectorRef: ChangeDetectorRef, private profile: ProfileService, private route: ActivatedRoute, private router: Router, private users: UserService) { }
  ngOnInit(): void {
    let userId = ''
    this.route.params.subscribe(params => {
      userId = params['id'];
    });
    if (userId) {

      this.profile.isValid(userId).subscribe({
        next: (res: any) => {
          this.user = res.user
          this.profile.getArtworks(userId).subscribe({
            next: (res) => {

              this.artworks = res.artworks
              this.dataSource = new MatTableDataSource<any>(this.artworks);
              this.changeDetectorRef.detectChanges();
              this.dataSource.paginator = this.paginator;
              this.obs = this.dataSource.connect();
              console.log(this.obs)

            },
          })
          this.profile.getBooks(userId).subscribe({
            next: (res) => {
              this.books = res.books
              console.log(res.books)
            },
          })
          this.profile.isFollow(userId).subscribe({
            next: (res) => {
              this.following = res.status
            },
          })
        },
        error: (err) => {
          this.router.navigate(['/'])
        }
      })
    } else {
      this.profile.getUser().subscribe({
        next: (res: any) => {
          this.user = res.user
          this.profile.getArtworks(res.user.user_id).subscribe({
            next: (res) => {
              this.artworks = res.artworks
              this.dataSource = new MatTableDataSource<any>(this.artworks);
              this.changeDetectorRef.detectChanges();
              this.dataSource.paginator = this.paginator;
              this.obs = this.dataSource.connect();

            },
          })
          this.profile.getBooks(res.user.user_id).subscribe({
            next: (res) => {
              this.books = res.books
            },
          })

        },
        error: (err) => {
          this.router.navigate(['/'])
        }
      })

    }
  }
  vote(artwork) {

    this.users.voteArt(artwork.artwork_id, !artwork.votes.includes(this.user._id)).subscribe({
      next: (res) => {
        this.artwork = res.artwork

      }
    })
  }


  art() {
    this.isArt = true
  }

  book() {
    this.isArt = false
    this.dataSource = new MatTableDataSource<any>(this.books);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs2 = this.dataSource.connect();
  }

  getArtwork(a) {
    this.artwork = a
  }
}
