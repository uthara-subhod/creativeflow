import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {
  searchQuery = ''
  artworks: any
  artfield=''
  free = false
  paid = false
  mature =false
  time:any[]=[]

  artwork:any

  constructor(private browse: BrowseService) { }

  getArtField(a) {
    this.artfield=a
  }

  get artfieldArts(){
    if(this.artfield!==''){
      return this.artworks.filter(art =>
        art.category==this.artfield
      );
    }else{
      return this.artworks
    }
  }

  ngOnInit(): void {
    this.browse.getArtworks().subscribe({
      next: (res) => {
        this.artworks = res.artworks
      }
    })
  }

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

  get searchedArtworks() {
    return this.artfieldArts.filter(art =>
      art.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      art.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  get filteredArtworks(){
    return this.searchedArtworks.filter(artwork =>{
        if(this.time.length!==0){
          const mTime = this.time.reduce((oldest, current) => {
            return current < oldest ? current : oldest;
          }, this.time[0]);
          let date = new Date(artwork.publishedAt)
          const t = date>=mTime
          if(!t){
            return false
          }
        }
        if(this.free&&!this.paid){
          const free = artwork.premium
          if(!free){
            return false
          }
        }
        if(this.paid&& !this.free){
          const paid =!artwork.premium
          if(!paid){
            return false
          }
        }
        if(this.mature){
          const m = !artwork.mature
          if(!m){
            return false
          }
        }
        return true
    }
    );
  }

  getArtwork(a){
    this.artwork = a
  }
}
