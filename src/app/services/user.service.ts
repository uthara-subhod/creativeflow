import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = apiURL
  constructor(private http: HttpClient) { }
  categories(type:string){
    return this.http.get<any>(`${this.apiUrl}/${type}`);
  }

  voteArt(artwork_id:string,vote:boolean){
    return this.http.post<any>(`${this.apiUrl}/artwork/${artwork_id}/vote`, {isVote:vote})
  }

  voteChapter(chapter_id:string,vote:boolean){
    return this.http.post<any>(`${this.apiUrl}/chapter/${chapter_id}/vote`, {isVote:vote})
  }

  report(data:any){
    return this.http.post<any>(`${this.apiUrl}/report`, data)
  }

  provider(data:any){
    return this.http.post<any>(`${this.apiUrl}/provider`, data)
  }

  buyBook(book:string){
    return this.http.get<any>(`${this.apiUrl}/book/${book}/buy`)
  }

  paidBook(book:string){
    return this.http.get<any>(`${this.apiUrl}/book/paid/${book}`)
  }

  getLibrary(){
    return this.http.get<any>(`${this.apiUrl}/library`)
  }
  getChapter(chapter:string,book:string){
    return this.http.get<any>(`${this.apiUrl}/library/${book}/${chapter}`)
  }

}
