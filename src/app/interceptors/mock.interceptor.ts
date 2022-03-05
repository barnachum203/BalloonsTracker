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
import { Ballon } from '../Model/Ballon';
import mockDb from '../../assets/mockdb/mockDb.json';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (environment.IS_MOCK) {
      const path: string[] = request.url.split('/');
      const route: string = path[path.length - 1]; //get the last route
      console.log(route);

      const req = request.clone();

      switch (route) {
        
        case 'ballon':
          // console.log(req.method);

          switch (req.method) {
            case 'POST':
              console.log("POST");
              
              return of(new HttpResponse({ status: 200, body: {} }));
              break;
            case 'GET':
              console.log('GET');

              break;
            case 'PUT':
              console.log('PUT');

              return of(
                new HttpResponse({
                  status: 200,
                  body: {},
                })
              );
              break;

            default:
              break;
          }
          return of(
            new HttpResponse({ status: 200, body: mockDb[route]['ballons'] })
          );
      }
    }

    return next.handle(request);
  }

  
  private handleError(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({
          status: 400,
          statusText: 'BAD REQUEST',
        });
        console.log(err);
        return throwError(err);
      })
    );
  }

  private handleError401(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({
          status: 401,
          statusText: 'UNAUTHORIZED',
        });
        console.log(err);
        return throwError(err);
      })
    );
  }
  private handleError409(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({
          status: 409,
          statusText: 'CONFLICT',
        });
        console.log(err);
        return throwError(err);
      })
    );
  }
  private handleError404(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({
          status: 404,
          statusText: 'NOT FOUND',
        });
        console.log(err);
        return throwError(err);
      })
    );
  }

  private handleError500(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError(() => {
        const err = new HttpErrorResponse({
          status: 500,
          statusText: 'INTERNAL SERVER ERROR',
        });
        console.log(err);
        return throwError(err);
      })
    );
  }
}
