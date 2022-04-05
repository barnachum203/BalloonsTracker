import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable, of, Subscriber, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { TokenStorageService } from '../services/shared/token-storage.service';
import { PopupMessagesService } from '../services/shared/popup-messages.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private storage: TokenStorageService,
    private popupService: PopupMessagesService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Inside Header Interceptor');

    const userId = this.storage.getUserId() || 'null';
    const token = this.storage.getToken() || 'null';
    const modifiedReq: HttpRequest<any> = request.clone({
      setHeaders: {
        'user-id': userId,
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq);
  }
}
