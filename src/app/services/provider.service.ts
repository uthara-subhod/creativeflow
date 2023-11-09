import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private apiUrl = apiURL
  constructor(private http:HttpClient) { }

  clientRequests(){
    return this.http.get<any>(`${this.apiUrl}/commissions`);
  }

  vendorRequests(){
    return this.http.get<any>(`${this.apiUrl}/create/commissions`);
  }

  hire(data:any){
    return this.http.post<any>(`${this.apiUrl}/commissions`,data);
  }

  getCommission(id:string){
    return this.http.get<any>(`${this.apiUrl}/commissions/${id}`);
  }

  approveCommission(status:string,id:string){
    return this.http.post<any>(`${this.apiUrl}/create/commissions/${id}/status`,{status:status});
  }

  editCommission(data:any,id:string){
    return this.http.post<any>(`${this.apiUrl}/create/commissions/${id}`,data);
  }

  agreeCommission(id:string){
    return this.http.get<any>(`${this.apiUrl}/commissions/${id}/agree`);
  }

  payCommission(id:string,paymentId:string){
    return this.http.post<any>(`${this.apiUrl}/commission/${id}/pay`,{paymentId:paymentId});
  }

  isPaid(){
    return this.http.get<any>(`${this.apiUrl}/commissions/pending`);
  }

}
