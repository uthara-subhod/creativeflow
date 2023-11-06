import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.service';
import { CreateService } from 'src/app/services/create.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

interface Book {
  book_id?: string;
  author?: string;
  title: string;
  description: string;
  cover: string;
  copyright: string;
  mature: boolean;
  tags: string[];
  chapters: any[];
  language: string;
  premium: boolean;
  pricing: number;
  category?: string;
  complete: boolean;
  published?: boolean;
}

@Component({
  selector: 'app-create-book-main',
  templateUrl: './create-book-main.component.html',
  styleUrls: ['./create-book-main.component.css']
})
export class CreateBookMainComponent implements OnInit, OnChanges {
  constructor(private user: UserService, private browse: BrowseService, private profile: ProfileService, private router: Router, private route: ActivatedRoute, private create: CreateService) { }
  words = 0
  error = false
  book: Book = {
    title: 'Untitled',
    description: '',
    cover: '../../../../../assets/images/cover-dummy.jpg',
    copyright: '',
    mature: false,
    tags: [],
    chapters: [],
    language: '',
    premium: false,
    pricing: 0,
    complete: false,
    published: false

  }
  book_id = ''
  uploadedFileUrl = ''
  cat: any
  tag: string = ''
  languages: any
  language: any
  categories: any
  options: UploadWidgetConfig = {
    apiKey: "free",
    maxFileCount: 1,
    "editor": {
      "images": {
        "crop": true,
        "cropRatio": 512 / 800,
        "cropShape": "rect",
        "preview": true
      }
    },
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/avif"
    ]
  };
  onComplete = (files: UploadWidgetResult[]) => {
    if (files[0].fileUrl != '') {

      this.uploadedFileUrl = files[0]?.fileUrl;
      this.book.cover = this.uploadedFileUrl
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.book.cover == '') {
      this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
    }
  }

  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.create.book(id).subscribe({
      next: (res) => {

        this.book = res.book
        this.book_id = res.book._id
        if (this.book.cover == '') {
          this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
        }
        this.book.chapters.forEach((chapter) => {
          this.words += chapter.words;
        });
        this.book.category = res.book.category._id
      },
      error: () => {
        this.error = true
        this.router.navigate(['/error'])
      }
    })


    this.user.categories('genres').subscribe({
      next: (res) => {
        this.categories = res.data
      }
    })
    this.profile.getCountries().subscribe({
      next: (data: any[]) => {
        const allLanguages = new Set<string>();

        data.forEach((country) => {
          if (typeof country.languages === 'object') {
            const languageValues = Object.values(country.languages as string[]);
            languageValues.forEach((language: string) => {
              allLanguages.add(language);
            });
          }
        });

        // Convert the Set of languages to an array
        this.languages = Array.from(allLanguages);
        console.log(this.languages)
      }
    })

  }



  addTag() {
    if (this.tag.trim() !== '') {
      this.book.tags.push(this.tag.trim());
      this.tag = '';
    }
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); // Prevents the space/enter from being added to the input field
      this.addTag();
    }
  }

  addChapter() {
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
    this.book.title = this.book.title.trim()
    this.book.description = this.book.description.trim()
    const data = this.book
    if (this.book.cover == '../../../../../assets/images/cover-dummy.jpg') {
      data.cover = ''
    }
    if (this.book.title == '') {
      Swal.fire({
        icon: 'error',
        title: 'Title Cant be empty!',
        showConfirmButton: false,
      })
      if (this.book.cover = '') {
        this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
      }

      return
    }
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    if (id) {
      this.create.saveBook(data).subscribe({
        next: (res) => {
          if (this.book.cover == '') {
            this.book.cover = '../../../../../assets/images/cover-dummy.jpg'
          }
          this.create.addChapter(this.book_id).subscribe({
            next: (res) => {

              this.router.navigate([`/create/chapter/${res.chapter.chapter_id}`])

            }
          })

          Toast.fire({
            icon: "success",
            title: "Book saved successfully",
          })
        }
      })
    }

  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.error) {
      return Swal.fire({
        title: 'Unsaved Changes',
        text: 'Do you really want to leave without saving changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
      }).then((result) => {
        if (result.isConfirmed) {

          return true;
        } else {
          return false;
        }
      });

    } else {
      return true
    }

  }


}
