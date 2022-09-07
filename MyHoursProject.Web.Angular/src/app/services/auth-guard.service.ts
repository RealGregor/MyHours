import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token = JSON.parse(localStorage.getItem('ah_access_token') ?? '{}');

    if (!token.access_token) this.router.navigate(['/settings']);;

    if (token.expirationTime < new Date()) {
      localStorage.removeItem('ah_access_token');
      this.router.navigate(['/settings']);
    }

    return true;
  }
}
