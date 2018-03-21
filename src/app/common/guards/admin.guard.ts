import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  public canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> =>
    this.authService.isAdmin$.map(isAdmin => {
        if (isAdmin) {
          return true;
        }
        else {
          this.router.navigateByUrl('/');
          return false;
        }
      }
    );
}
