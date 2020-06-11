// Angular Modules
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  private getHeader(): HttpHeaders {
    let obj={};
    obj['Content-Type']='application/json';
    if(localStorage.getItem('token'))
      obj['token']= localStorage.getItem('token');
    return new HttpHeaders(obj);
  }
  public get(url: string) {
    return this.http.get(environment.apiURL + url, {headers: this.getHeader()});
  }
  public post(url: string, data: any) {

    return this.http.post(environment.apiURL + url, data, {headers:this.getHeader()});
  }
  public put(url: string, data: any) {
    return this.http.put(environment.apiURL + url, data, {headers: this.getHeader()});
  }
  public delete(url: string) {
    return this.http.delete(environment.apiURL + url, {headers: this.getHeader()});
  }
}
