import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = apiURL
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

  getArtworks(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/artworks`)
  }

  getBooks(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/books`)
  }

  getChatList(){
    return this.http.get<any>(`${this.apiUrl}/chat/list`)
  }


  getMessages(user1:string, user2:string){
    return this.http.get<any>(`${this.apiUrl}/chat/${user1}/${user2}`)
  }

  sendMessage(user1:string, user2:string,message:string){
    return this.http.post<any>(`${this.apiUrl}/chat/${user1}/${user2}`,{message:message})
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

  clearNotif(id:string){
    return this.http.get<any>(`${this.apiUrl}/user/${id}/notifications/clear`)
  }

  getCountries(){
    return this.http.get<any>(`https://restcountries.com/v3.1/all`)
  }

  plan(plan:string){
    return this.http.post<any>(`${this.apiUrl}/user/plan`,{plan:plan});
  }
  roles(data:any){
    return this.http.post<any>(`${this.apiUrl}/user/roles`,data);
  }

  account(data:any){
    return this.http.post<any>(`${this.apiUrl}/razorpay`,data);
  }

}
