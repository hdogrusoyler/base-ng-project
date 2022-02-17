import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserJwtToken } from './model';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private service: ServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      const user: UserJwtToken = this.service.userValue;
    if (user) {
      //Role[user.role]
      if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      else {
        return true;
      }
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    //const rol: any = this.service.token == null ? this.service.token : parseInt(this.service.token, 10);
    
    // const role: any = this.service.token;
    // if (role) {
    //   if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
    //     this.router.navigate(['/login'], {
    //       queryParams: { returnUrl: state.url },
    //     });
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else {
    //   this.router.navigate(['/login'], {
    //     queryParams: { returnUrl: state.url },
    //   });
    //   return false;
    // }

  }
  
}
