import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  follow(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/follow`);
  }
  isValid(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}`);
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/people`);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`)
  }

  getNotifications(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/notifications`)
  }

  isFollow(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/isfollow`);
  }

  unFollow(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/unfollow`);
  }

  editProfile(data:any){
    return this.http.post<any>(`${this.apiUrl}/user/edit`,data);
  }

  async getCountries(){
    return axios.get(`https://restcountries.com/v3.1/all`)
  }

}
