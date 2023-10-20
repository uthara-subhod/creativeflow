import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';
import { BrowseService } from 'src/app/services/browse.service';
import { CreateService } from 'src/app/services/create.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit{
artwork:any
artwork_id:any
tag:string =''
categories:any =[]
options: UploadWidgetConfig = {
  apiKey: "free",
  maxFileCount: 1,
  "editor": {
    "images": {
      "crop": true,
      "cropRatio": 952 / 748,
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
constructor(private user: UserService, private browse:BrowseService, private profile: ProfileService, private router:Router, private route:ActivatedRoute, private create: CreateService) { }
ngOnInit(): void {
  let id =''
  this.route.params.subscribe(params => {
    id = params['id'];
  });

    this.browse.getArtwork(id).subscribe({
      next: (res) => {
        this.artwork = res.artwork
        this.artwork_id = res.artwork._id
        if(this.artwork.artwork==''){
          this.artwork.artwork='../../../../../assets/images/arkwork_dummy.png'
        }
        this.artwork.category = res.artwork.category._id
      },
      error:()=>{

      }
    })


  this.user.categories('artfields').subscribe({
    next: (res) => {
      this.categories = res.data
      console.log(res.data)
    }
  })
}
onComplete = (files: UploadWidgetResult[]) => {
  if(files[0].fileUrl!=''){
    this.artwork.artwork = files[0]?.fileUrl
  }
};

addTag() {
  if (this.tag.trim() !== '') {
    this.artwork.tags.push(this.tag.trim());
    this.tag = '';
  }
}

onInputKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault(); // Prevents the space/enter from being added to the input field
    this.addTag();
  }
}
}
