import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { SignInService } from "./sign-in.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("canActivate!");
    if (this.signIn.authorized) { return true; }
    this.signIn.redirectUrl = state.url;
    this.router.navigate(['/sign_in']);
    return false;
  }

  constructor(private signIn: SignInService, private router: Router) {}
}
