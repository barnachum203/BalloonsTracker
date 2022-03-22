import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { PopupMessagesService } from '../shared/popup-messages.service';
import { TokenStorageService } from '../shared/token-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private storage: TokenStorageService,
    private popupService: PopupMessagesService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Inside Error Interceptor');

    return next.handle(request).pipe((s) => this.handleError(s));
  }

  private handleError(
    source: Observable<HttpEvent<unknown>>
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        // try to avoid errors on logout
        if (error.status === 500) {
          return this.handle500(error);
        }
        if (error.status === 401) {
          return this.handle401(error);
        }
        if (error.status === 409) {
          this.handle409(error);
        }

        // rethrow error
        return throwError(() => error);
      })
    );
  }
  private handle500(err: HttpErrorResponse) {
    this.popupService.openGlobalPopup(err.message);
    return EMPTY;
    // return
  }
  private handle401(err: HttpErrorResponse) {
    console.log(err);

    this.popupService.openGlobalPopup(err.message);
    this.storage.signOut();
    return EMPTY;
  }
  private handle409(err: HttpErrorResponse) {
    this.popupService.openGlobalPopup(err.message);
    // return EMPTY;
    return;
  }
}
