import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateService } from 'src/app/services/create.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-a-navbar',
  templateUrl: './a-navbar.component.html',
  styleUrls: ['./a-navbar.component.css']
})
export class ANavbarComponent {
  @Input() artwork: any

  constructor(private create: CreateService, private route: ActivatedRoute, private router: Router) { }
  save(isToast?:boolean) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    const currentRoute = this.router.url;
    this.artwork.title = this.artwork.title.trim()
    this.artwork.description = this.artwork.description.trim()
    const data = this.artwork
    if (this.artwork.artwork == '../../../../../assets/images/arkwork_dummy.png') {
      data.artwork = ''
    }
    if (this.artwork.title == '') {
      if(isToast){
      Swal.fire({
        icon: 'error',
        title: 'Title Cant be empty!',
        showConfirmButton: false,
      })
    }
      if (this.artwork.artwork = '') {
        this.artwork.artwork = '../../../../../assets/images/arkwork_dummy.png'
      }

      return
    }
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    if (id) {
      this.create.saveArtwork(data).subscribe({
        next: (res) => {
          if (this.artwork.artwork == '') {
            this.artwork.artwork = '../../../../../assets/images/arkwork_dummy.png'
          }
          if(isToast){

            Toast.fire({
              icon: "success",
              title: "artwork saved successfully",
            })
          }
        }
      })
    }

  }
  togglepublish() {

    const currentRoute = this.router.url;
    if (!this.artwork.published) {
      if (!this.artwork.copyright || this.artwork.copyright == '' || !this.artwork.category || this.artwork.category == '' || this.artwork.title == '' ||this.artwork=='../../../../../assets/images/arkwork_dummy.png' || this.artwork=='') {
        Swal.fire({
          icon: 'error',
          title: 'Miising Fields',
          text: `You havent added all details for your artwork!`,
          showConfirmButton: false,
        })
        return
      }
      this.save(false)
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This artwork will be published!',
        confirmButtonText: 'I am sure',
        showCancelButton: true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.publishArtwork(this.artwork).subscribe({
            next: (res) => {
              this.artwork=res.artwork
              Swal.fire('Published successfully', '', 'success')

            },
            error: () => {

              Swal.fire('Error publishing', '', 'error')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Error publishing', '', 'info')
        }
      })

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This artwork will be unpublished!',
        confirmButtonText: 'I am sure',
        showCancelButton: true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.create.unpublishArtwork(this.artwork).subscribe({
            next: (res) => {
              this.artwork=res.artwork
              Swal.fire('Unpublished successfully', '', 'success')
            },
            error: () => {

              Swal.fire('Error unpublishing', '', 'error')
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Error unpublishing', '', 'info')
        }
      })
    }
  }

  delete() {
    const currentRoute = this.router.url;

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Once you delete, its gone!',
      confirmButtonText: 'I am sure',
      showCancelButton: true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.create.deleteArtwork(this.artwork).subscribe({
          next: (res) => {

            Swal.fire('Deleted successfully', '', 'success').then(() => {
              this.router.navigate([`/create`])
              ///artwork/${this.artwork.artwork_id}
            })
          },
          error: () => {

            Swal.fire('Error deleting', '', 'info')
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Not deleted', '', 'info')
      }
    })

  }
}
