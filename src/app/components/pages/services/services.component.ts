import { Component } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  providers: any[] = [];

  lc = 1
  hc = 99999
  service = ''
  value=0
  s:any
  min:any[] =[]
  max:any[] =[]
  time:any[]=[]
  free = false
  paid = false
  mature =false
  complete = false
  ongoing = false
  user:any


  constructor(private browse:BrowseService, private profile:ProfileService){}



  searchQuery: string = '';
  ngOnInit(): void {
      this.browse.getProviders().subscribe({
        next:(res)=>{
          this.providers=res.providers
        }
      })
      this.profile.getUser().subscribe({
        next:(res)=>{
          this.user=res.user
        }
      })
  }

  getservice(g){
    this.service=g
  }

  get serviceproviders() {
    if(this.service!==''){
      return this.providers.filter(book =>
       book.service==this.service
      );
    }else{
      return this.providers
    }
  }

  applyLength(e){
    const [min,max] = e.target.value.split(',')
    if (e.target.checked) {
      this.min.push(min*1)
      this.max.push(max*1)
      this.lc = Math.min(...this.min)
      this.hc = Math.max(...this.max)
    } else {
      this.min = this.min.filter((val) => val !== min*1)
      this.lc = this.min.length == 0 ? 1 : Math.min(...this.min)
      this.max = this.max.filter((val) => val !== max*1)
      this.hc = this.max.length==0 ? 99999 : Math.max(...this.max)
    }
  }


  // Function to apply filters
  applyTime(e) {
    const value = e.target.value
    const today = new Date()
    let date = new Date(today)
    switch (value) {
      case 'day':
        date.setDate(today.getDate()-1)
        break;
      case 'week':
        date.setDate(today.getDate()-7)
        break;
      case 'month':
        date.setDate(today.getDate()-30)
        break;
      case 'year':
        date.setDate(today.getDate()-365)
        break;
      default:
        break;
    }
    if (e.target.checked) {
      this.time.push(date)
    } else {
      this.time = this.time.filter((val) => val.getDate() !== date.getDate())
    }
  }

  get filteredproviders(){
    return this.searchedproviders.filter(book =>{
        if(this.time.length!==0){
          const mTime = this.time.reduce((oldest, current) => {
            return current < oldest ? current : oldest;
          }, this.time[0]);
          let date = new Date(book.date)
          const t = date>=mTime
          if(!t){
            return false
          }
        }

        return true
    }
    );
  }

  getService(s){
    this.s=s
  }

  get searchedproviders() {
    return this.serviceproviders.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


}
