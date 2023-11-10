import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiUrl = `${apiURL}/create`
  constructor(private http:HttpClient) { }

  createBook(data:any){
    return this.http.get<any>(`${this.apiUrl}/book`)
  }

  createArtwork(data:any){
    return this.http.get<any>(`${this.apiUrl}/artwork`)
  }

  books(){
    return this.http.get<any>(`${this.apiUrl}/books`)
  }

  chapter(id:string){
    return this.http.get<any>(`${this.apiUrl}/chapter/${id}`)
  }

  book(id:string){
    return this.http.get<any>(`${this.apiUrl}/book/${id}`)
  }

  artworks(){
    return this.http.get<any>(`${this.apiUrl}/artworks`)
  }

  saveBook(data:any){
    return this.http.post<any>(`${this.apiUrl}/book/save`, data)
  }

  saveArtwork(data:any){
    return this.http.post<any>(`${this.apiUrl}/artwork/save`, data)
  }

  publishBook(data:any){
    return this.http.post<any>(`${this.apiUrl}/book/publish`, data)
  }

  publishArtwork(data:any){
    return this.http.post<any>(`${this.apiUrl}/artwork/publish`, data)
  }

  unpublishArtwork(data:any){
    return this.http.post<any>(`${this.apiUrl}/artwork/unpublish`, data)
  }

  unpublishBook(data:any){
    return this.http.post<any>(`${this.apiUrl}/book/unpublish`, data)
  }

  deleteBook(data:any){
    return this.http.post<any>(`${this.apiUrl}/book/delete`, data)
  }

  deleteArtwork(data:any){
    return this.http.post<any>(`${this.apiUrl}/artwork/delete`, data)
  }

  addChapter(id:string){
    return this.http.get<any>(`${this.apiUrl}/${id}/chapter`)
  }

  saveChapter(data:any){
    return this.http.post<any>(`${this.apiUrl}/chapter/save`, data)
  }

  publishChapter(data:any){
    return this.http.post<any>(`${this.apiUrl}/chapter/publish`, data)
  }

  unpublishChapter(data:any){
    return this.http.post<any>(`${this.apiUrl}/chapter/unpublish`, data)
  }

  deleteChapter(data:any){
    return this.http.post<any>(`${this.apiUrl}/chapter/delete`, data)
  }

  transactions(){
    return this.http.get<any>(`${this.apiUrl}/transactions`)
  }

  status(status:string,id:string){
    return this.http.post<any>(`${this.apiUrl}/transactions/${id}`, {status:status})
  }




}
