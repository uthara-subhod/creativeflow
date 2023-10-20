import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books: any[] = [];

  lc = 1
  hc = 99999
  genre = ''
  min:any[] =[]
  max:any[] =[]
  time:any[]=[]
  free = false
  paid = false
  mature =false
  complete = false
  ongoing = false

  constructor(private browse:BrowseService){}



  searchQuery: string = '';
  ngOnInit(): void {
      this.browse.getBooks().subscribe({
        next:(res)=>{
          this.books=res.books
        }
      })
  }

  getGenre(g){
    this.genre=g
  }

  get genreBooks() {
    if(this.genre!==''){
      return this.books.filter(book =>
       book.category==this.genre
      );
    }else{
      return this.books
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

  get filteredBooks(){
    return this.searchedBooks.filter(book =>{
        const ch = book.chapters.length>=this.lc&&book.chapters.length<=this.hc
        if(!ch){
          return false
        }
        if(this.time.length!==0){
          const mTime = this.time.reduce((oldest, current) => {
            return current < oldest ? current : oldest;
          }, this.time[0]);
          let date = new Date(book.publishedAt)
          const t = date>=mTime
          if(!t){
            return false
          }
        }
        if(this.free&&!this.paid){
          const free = book.premium
          if(!free){
            return false
          }
        }
        if(this.paid&& !this.free){
          const paid =!book.premium
          if(!paid){
            return false
          }
        }
        if(this.complete&&!this.ongoing){
          const complete = book.complete
          if(!complete){
            return false
          }
        }
        if(this.ongoing&&!this.complete){
          const ongoing = !book.complete
          if(!ongoing){
            return false
          }
        }

        if(this.mature){
          const m = !book.mature
          if(!m){
            return false
          }
        }
        return true
    }
    );
  }


  get searchedBooks() {
    return this.genreBooks.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }




}
