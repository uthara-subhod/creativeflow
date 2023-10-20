import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  private apiUrl = `${apiURL}/moderator`
  constructor(private http: HttpClient) { }
  getToken(): any {
    return localStorage.getItem('mod')
  }

  getReports(){
    return this.http.get<any>(`${this.apiUrl}/reports`)
  }

  getReport(id:string){
    return this.http.get<any>(`${this.apiUrl}/reports/${id}`)
  }

  resolveReport(id:string, data:any){
    return this.http.post<any>(`${this.apiUrl}/reports/${id}`,data)
  }

}
