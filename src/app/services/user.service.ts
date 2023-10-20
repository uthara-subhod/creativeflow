import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'
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
}
