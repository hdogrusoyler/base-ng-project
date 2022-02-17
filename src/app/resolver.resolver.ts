import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ServiceService } from './service.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ResolverResolver implements Resolve<boolean> {
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return of(true);
//   }
// }

@Injectable({
  providedIn: 'root'
})

export class TitleResolver implements Resolve<any> {
  
  constructor(private service: ServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getTitle().pipe(
      catchError((error) => {
        console.log(error);
         return of('Title Yok');
      }));
  }
}

@Injectable({
  providedIn: 'root'
})

export class CategoryResolver implements Resolve<any> {
  
  constructor(private service: ServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getCategory().pipe( //route.params['categoryId']
      catchError((error) => {
        console.log(error);
         return of('Category Yok');
      }));
  }
}