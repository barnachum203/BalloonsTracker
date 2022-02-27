import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import mockDb from '../../assets/mockdb/mockDb.json';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthUser } from '../components/login/store/auth.models';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('intercept');

    if (environment.IS_MOCK) {
      const path: string[] = request.url.split('/');
      const route: string = path[path.length - 1]; //get the last route
      const req = request.clone();

      const userData: AuthUser = mockDb[route] as AuthUser;
      const reqUserData: any = req.body;

      if (
        reqUserData.email === userData.email &&
        reqUserData.password === userData.password
      ) {
        return of(new HttpResponse({ status: 200, body: mockDb[route] }));
      } else {
        return next.handle(req).pipe((s) => this.error(s));
      }
    }

    return next.handle(request);
  }

  private error(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({ status: 400 , statusText: "wrong username and password"});
        console.log(err);
        return throwError(err);
      })
    );
  }
  // private throw400BadRequest(): ResponseOptions {
  //   const { headers, url } = this.reqInfo;
  //   return {
  //     status: 400,
  //     headers,
  //     url,
  //     body: {
  //       status: 400,
  //       code: 'invalid_grant',
  //       message: 'Invalid grant: user credentials are invalid',
  //     },
  //   };
  // }
}
