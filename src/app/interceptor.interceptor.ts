import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private service: ServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.service.token != null ? JSON.parse(this.service.token) : '';
    // const jwt = this.service.token != null ? this.service.token : '';
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }
    return next.handle(request);
  }
}
