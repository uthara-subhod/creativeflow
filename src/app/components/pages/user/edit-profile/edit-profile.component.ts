import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';
import axios from 'axios';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user = {
    fullname:'',
    profile:'',
    country:''
  }
  countries: any[] = [];
  error=false
  msg = ''

  tabs = [
    { title: 'Edit Profile', active: true },
    { title: 'Change Password', active: false },
    { title: 'Manage Access', active: false },
    // Add more tabs as needed
  ];

  uploadedFileUrl: string = '../../../assets/images/dummy-image.jpeg';

  following:boolean=false

  constructor(private profile:ProfileService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.profile.getUser().subscribe({
      next:(res)=>{
        this.user.fullname=res.user.fullname
        this.user.profile=res.user.profile
        this.user.country = res.user.country

      }
    })

    this.getCountries().then((data: any) => {
      this.countries = data;
    })


  }
  options: UploadWidgetConfig = {
    apiKey: "public_kW15bhn3GMUNmnekCdwzGVeqt6CX", // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
    "editor": {
      "images": {
        "crop": true,
        "cropRatio": 1,
        "cropShape": "circ",
        "preview": true
      }
    }
  };
  onComplete = (files: UploadWidgetResult[]) => {
    this.uploadedFileUrl = files[0]?.fileUrl;
  };

  selectTab(tab: any): void {
    this.tabs.forEach(t => (t.active = false)); // Deselect all tabs
    tab.active = true; // Select the clicked tab
  }


  async getCountries(){
    const url = 'https://restcountries.com/v3.1/all'
    try {
      const response = await axios.get(url);
      this.countries=response.data;
      return response.data
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw error;
    }
  }

  submit(){
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
    this.user.fullname=this.user.fullname.trim()
    if(this.user.fullname===''){
      this.msg=`Fullname cannot be emptry. Please try again.`
      this.error=true;
      return
    }
    if(this.uploadedFileUrl!='../../../assets/images/dummy-image.jpeg'){
      this.user.profile=this.uploadedFileUrl
    }
    const data ={
      fullname:this.user.fullname,
      profile:this.user.profile,
      country:this.user.country
    }
    this.profile.editProfile(data).subscribe({
      next:(res)=>{
        Toast.fire({
          icon: "success",
          title: "Profile Edited successfully",
      })
      },
      error:(err)=>{
        alert(err.error.msg)
        console.log(err.error.msg)
      }
    })
  }

  close(){
    this.error=false
  }

  onCountryChange(selectedCountry: string) {
    this.user.country = selectedCountry;
  }
}
