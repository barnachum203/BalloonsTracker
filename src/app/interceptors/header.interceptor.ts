import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import mockDb from '../../assets/mockdb/mockDb.json';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { AuthUser } from '../components/login/store/auth.models';
import { Store } from '@ngrx/store';
import * as MapActions from '../components/menu/store/map.actions';
import { Ballon } from '../Model/Ballon';
import * as MapSelectors from '../components/menu/store/map.selectors';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('intercept');

    if (environment.IS_MOCK) {
      const path: string[] = request.url.split('/');
      const route: string = path[path.length - 1]; //get the last route
      console.log(route);

      const req = request.clone();

      const userData: AuthUser = mockDb[route] as AuthUser;
      const reqUserData: any = req.body;
      switch (route) {
        case 'login':
          if (
            reqUserData.email === userData.email &&
            reqUserData.password === userData.password
          ) {
            return of(new HttpResponse({ status: 200, body: mockDb[route] }));
          } else {
            return next.handle(req).pipe((s) => this.handleError(s));
          }
        case 'ballon':
          // console.log(req.method);

          switch (req.method) {
            case 'POST':
              // if(req.body)

              const ballon: Ballon = req.body['ballon'];

              return of(new HttpResponse({ status: 200, body: ballon }));
              break;
            case 'GET':
              console.log('GET');

              // let ballons$ = this.store.select(MapSelectors.selectMapBallons);
              // ballons$.subscribe(
              //   (val) => {
              //     console.log(val);
              //     const baloones = val;
              //   },
              //   (err) => {},
              //   () => {
              //     return of(
              //       new HttpResponse({ status: 200, body: baloones })
              //     );
              //   }
              // );

              break;
            case 'PUT':
              console.log('PUT');
              // console.log({ ...req.body['ballon'] });
              const updatedBallon: Ballon = { ...req.body['ballon'] };

              return of(
                new HttpResponse({
                  status: 200,
                  body: updatedBallon,
                })
              );
              break;

            default:
              break;
          }
          return of(
            new HttpResponse({ status: 200, body: mockDb[route]['ballons'] })
          );

        default:
          return next.handle(req).pipe((s) => this.handleError(s));
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
          statusText: 'wrong username and password - BAD REQUEST',
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
