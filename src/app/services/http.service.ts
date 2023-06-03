import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  get(url:any){
    return this.http.get("http://127.0.0.1:8000/"+url,{observe:'response'});
  }
  post(url:any,form:any){
    return this.http.post("http://127.0.0.1:8000/"+url,form,{observe:'response'});
  }
  delete(url:any){
    return this.http.delete( "http://127.0.0.1:8000/"+url, { observe: "response" ,headers: {
      Accept: "application/json",
    },}).pipe();
  }
}
