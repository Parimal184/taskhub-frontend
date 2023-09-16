import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsMultipart = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
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

  postMultipart(endpoint: string, requestBody: any): Observable<any> {
    return this.http.post(endpoint, requestBody);
  }

  postBody(endPoint: string, requestPayload: any): Observable<any> {
    return this.http.post(endPoint, requestPayload, httpOptionsFullBody);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  getWithParam(endpoint: string, id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    const options = {
      params: params
    };
    return this.http.get(endpoint, options);
  }

  delete(endpoint: string, id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    const options = {
      params: params
    };
    return this.http.delete(endpoint, options);
  }

}
