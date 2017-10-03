import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignInService {

  apiBase = 'http://104.154.72.209:3075?service=authorize&wskey=';
  constructor(
          private http: Http
  ) { }

  checkAuthorization(wskey): Promise<any> {
      console.log(wskey)
      let url = this.apiBase + wskey;
      console.log(url);
      return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }
  
}


