import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Router } from "@angular/router";

@Injectable()
export class SignInService {
  authorized = false;

  credentials = null;
  signInError = false;
  redirectUrl?: string;

  apiBase = "http://104.154.72.209:3075?service=authorize&wskey=";
  constructor(private http: Http, private router: Router) {}

  checkAuthorization(wsKey: string) {
    let url = this.apiBase + wsKey;
    return this.http
      .get(url)
      .toPromise()
      .then(response => {
        let data = response.json();
        if (data.credentials.length > 0) {
          console.log("authorized");
          this.authorized = true;
          this.credentials = wsKey;
          this.signInError = false;
          let redirect = this.redirectUrl ? [this.redirectUrl] : [''];
          this.router.navigate(redirect);
        } else {
          this.signInError = true;
          console.log("authorization failed");
        }
      });
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
