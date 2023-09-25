import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'
  // private getState: Observable<any>;

  constructor(private http: HttpClient) {
  }


  getUserToken(){
    return localStorage.getItem('access');
  }

  refresh(){
    const token = this.getToken()
    return this.http.post<any>(`${this.apiUrl}/user/refresh`, {token});
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }

  login(formData:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, formData);
  }
  logout(){
    const token = this.getToken()
    return this.http.post<any>(`${this.apiUrl}/logout`, {token});
  }

  getOtp(email:any){
    return this.http.post<any>(`${this.apiUrl}/otp`, email);
  }



  editProfile(formData:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profile`,formData)
  }
}
