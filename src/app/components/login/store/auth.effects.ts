import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PopupMessagesService } from 'src/app/shared/popup-messages.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import * as AuthActions from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from 'src/app/shared/navigation.service';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((data: any) => AuthActions.loginSuccess( {user: data.user, token: data.token} )),
          catchError((data: any) => of(AuthActions.loginFailure( { error: data.error} )))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((data) => {
          // console.log(data);
          this.nav.home()
          this.popupService.openSuccessLogin();
          this.storage.saveUserId(data.user._id!);
          this.storage.saveToken(data.token!)
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((data) => {
          // console.log(data);
          this.nav.login();
          this.popupService.openFailureLogin();
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.storage.signOut()
          this.nav.login();
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private popupService: PopupMessagesService,
    private storage: TokenStorageService,
    private nav: NavigationService

  ) {}
}
