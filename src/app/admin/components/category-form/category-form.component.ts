import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UploadWidgetConfig,
  UploadWidgetResult,
  UploadWidgetOnUpdateEvent,
} from '@bytescale/upload-widget';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  @Input() type = '';
  cover = '';
  name = '';
  cover_url = false;
  options :UploadWidgetConfig |any = {
    apiKey: 'free', // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
    editor: {
      images: {
        crop: true,
        cropRatio: 146 / 47,
        cropShape: 'rect',
        preview: true,
      },
    },
    mimeTypes: ['image/jpeg', 'image/png', 'image/avif'],
  };

  constructor(private admin: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.type=='services'){
      this.options.editor.images.cropRatio=208/136
    }
    let id = '';
    this.route.params.subscribe((params) => {
      id = params['id'];
    });
    if (id) {
      this.admin.category(this.type, id).subscribe({
        next: (res) => {
          this.cover = res.item.cover;
          this.name = res.item.name;
          this.cover_url = true;
        },
      });
    }
  }

  onUpdate = (event: UploadWidgetOnUpdateEvent) => {
    console.log(JSON.stringify(event));
  };
  onComplete = (files: UploadWidgetResult[]) => {
    this.cover = files[0]?.fileUrl;
    this.cover_url = true;
  };

  submit() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    this.name = this.name.trim();
    if (this.name == '' || this.cover == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fields cannot be empty',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      });
      return;
    }
    const data = {
      name: this.name,
      cover: this.cover,
    };
    let id = '';
    this.route.params.subscribe((params) => {
      id = params['id'];
    });
    if (id) {
      this.admin.editCategory(this.type, id,data).subscribe({
        next: (res) => {
          Toast.fire({
            icon: 'success',
            title: 'Category Edited Successfully',
          });
          this.cover = data.cover;
          this.cover_url = true;
          this.name = data.name;
        },
        error: (err) => {
          console.log('erere')
          Toast.fire({
            icon: 'error',
            title: err.error.msg,
          });
        },
      });
    }else{
      this.admin.addCategory(this.type, data).subscribe({
        next: (res) => {
          Toast.fire({
            icon: 'success',
            title: 'Category Added Successfully',
          });
          this.cover = '';
          this.cover_url = false;
          this.name = '';
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: err.error.msg,
          });
        },
      });
    }
  }
}
