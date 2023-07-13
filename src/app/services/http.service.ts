import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


const httpOptionsFullBody = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(endpoint: string, requestBody: any): Observable<any> {
    return this.http.post(endpoint, requestBody, httpOptions);
  }

  postBody(endPoint: string, requestPayload: any): Observable<any> {
    return this.http.post(endPoint, requestPayload, httpOptionsFullBody);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

}
