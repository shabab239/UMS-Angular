import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import {StorageUtil} from "../../../util/storage.util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = StorageUtil.getFromLocalStorage('jwt');
    if (jwt) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
