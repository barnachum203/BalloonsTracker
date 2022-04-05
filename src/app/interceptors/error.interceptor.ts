import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupMessagesService } from '../services/shared/popup-messages.service';
import { AuthFacade } from '../components/login/store/auth.facade';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private popupService: PopupMessagesService, private athService: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Inside Error Interceptor');

    return next.handle(request).pipe((s) => this.handleError(s, request.url));
  }

  private handleError(
    source: Observable<HttpEvent<unknown>>,
    urlString: string
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error) => {
        // try to avoid errors on logout
        if (error.status === 500) {
          return this.handle500(error);
        }
        if (error.status === 401 && !urlString.includes('login')) {
          return this.handle401(error);
        }

        // console.log(error);

        // rethrow error
        return throwError(error);
      })
    );
  }
  private handle500(err: HttpErrorResponse) {
    this.popupService.openGlobalPopup(err.message);
    return EMPTY
  }
  private handle401(err: HttpErrorResponse) {
    console.log(err);
    this.popupService.openGlobalPopup(err.message);
    this.athService.logout();
    return EMPTY
  }
}
