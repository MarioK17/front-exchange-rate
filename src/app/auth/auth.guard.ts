import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authenticationService.currentUserValue;

    let authorized: boolean = false;

    if (currentUser && currentUser.roles) {
      // authorised so return true

      if(route.data?.roles) {

        for(let rol in route.data.roles) {

          console.log(route.data.roles[rol]);


          for(let _rol in currentUser.roles) {

            console.log(currentUser.roles[_rol]);

            if(route.data.roles[rol] == currentUser.roles[_rol]) {
              authorized = true;
              break;
            }

          }

          if(authorized)
            break;
        }

      }
      if(authorized)
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
