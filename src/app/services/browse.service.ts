import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private apiUrl = apiURL
  constructor(private http:HttpClient) { }

  getBook(id:string){
    return this.http.get<any>(`${this.apiUrl}/book/${id}`)
  }

  getArtwork(id:string){
    return this.http.get<any>(`${this.apiUrl}/artwork/${id}`)
  }

  getArtworks(){
    return this.http.get<any>(`${this.apiUrl}/artworks`)
  }

  getChapter(id:string){
    return this.http.get<any>(`${this.apiUrl}/chapter/${id}`)
  }

  getBooks(){
    return this.http.get<any>(`${this.apiUrl}/books`)
  }

  getProviders(){
    return this.http.get<any>(`${this.apiUrl}/providers`)
  }

  getProvider(id:string){
    return this.http.get<any>(`${this.apiUrl}/providers/${id}`)
  }
}
