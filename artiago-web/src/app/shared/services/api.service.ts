import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
  get( url: string, options: any = undefined ) : Promise<any> {
    return this.http.get(`${this.apiUrl}${url}`, options).toPromise();
  }

  post( url: string, body: any = undefined, options: any = undefined  ) : any {
    return this.http.post(`${this.apiUrl}${url}`, body, options).toPromise();
  }
  
  delete( url: string, options: any = undefined  ) : Promise<any> {
    return this.http.delete(`${this.apiUrl}${url}`, options).toPromise();
  }
}
