import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = apiURL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
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

  getOtp(email:any){
    return this.http.post<any>(`${this.apiUrl}/otp`, email);
  }

  googleAuth(data:any){
    return this.http.post<any>(`${this.apiUrl}/google`, data);
  }

  editProfile(formData:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profile`,formData)
  }


  password(data:any){
    return this.http.post<any>(`${this.apiUrl}/password`, data);
  }
}
