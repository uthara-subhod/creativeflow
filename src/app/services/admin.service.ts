import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable , BehaviorSubject} from 'rxjs';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private userUpdateSubject = new BehaviorSubject<boolean>(false);

  userUpdated$ = this.userUpdateSubject.asObservable();

  private apiUrl = `${apiURL}/admin`

  constructor(private http: HttpClient, private cookie:CookieService) { }

  getToken(): any {
    return localStorage.getItem('admin')
  }


  login(formData:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, formData);
  }

  dashboard():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}` )
  }

  editProvider(id:string, approved:boolean):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/providers/${id}/edit`,{approved:approved});
  }


  editUser(id:string):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}/edit`);
  }

  changes(){
    this.userUpdateSubject.next(true);
  }

  fetchTable(type:string){
    return this.http.get<any>(`${this.apiUrl}/${type}`)
  }

  addCategory(type:string, data:any){
    return this.http.post<any>(`${this.apiUrl}/${type}/add`,data)

  }

  editCategory(type:string, id:string, data:any){
    return this.http.post<any>(`${this.apiUrl}/${type}/${id}`,data)
  }

  category(type:string, id:string){
    return this.http.get<any>(`${this.apiUrl}/${type}/${id}`)
  }

  createMod(data){
    return this.http.post<any>(`${this.apiUrl}/moderators`,data)
  }

  getMods(){
    return this.http.get<any>(`${this.apiUrl}/moderators`)
  }

  getTransactions(){
    return this.http.get<any>(`${this.apiUrl}/transactions`)
  }

  getSeller(id:String){
    return this.http.get<any>(`${this.apiUrl}/transactions/seller/${id}`)
  }

  pay(id:String){
    return this.http.get<any>(`${this.apiUrl}/transactions/${id}`)
  }
}
