import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${apiURL}`
  constructor(private http: HttpClient) { }
  getComments(id:string){
    return this.http.get<any>(`${apiURL}/comments/${id}`)
  }
  addComment(data:any){
    return this.http.post<any>(`${apiURL}/comment/create`,data)
  }
  editComment(message:string, id:string){
    return this.http.post<any>(`${apiURL}/comment/${id}`, { message:message })
  }
  deleteComment(id:string){
    return this.http.delete<any>(`${apiURL}/comment/${id}`)
  }
}
