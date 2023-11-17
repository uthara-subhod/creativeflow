
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class PaymentService {
  private apiUrl = apiURL
    private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: any, private http:HttpClient) {}


    lazyLoadLibrary(resourceURL:any): Observable<any> {
        return forkJoin([
            this.loadScript(resourceURL)
        ]);
    }

    private loadScript(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }

        this._loadedLibraries[url] = new ReplaySubject();

        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        script.onload = () => {
            this._loadedLibraries[url].next({});
            this._loadedLibraries[url].complete();
        };

        this.document.body.appendChild(script);
        return this._loadedLibraries[url].asObservable();
    }

    transaction(data:any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/pay`,data);
    }

    buy(data:any){
      return this.http.post<any>(`${this.apiUrl}/buy`, data)
    }

    cancel(id:string){
      return this.http.get<any>(`${this.apiUrl}/user/${id}/subscription`)
    }
}
