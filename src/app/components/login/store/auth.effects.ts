import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PopupMessagesService } from 'src/app/shared/popup-messages.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((data: any) => AuthActions.loginSuccess( {user: data.user, token: data.token} )),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/home'])),
        tap((data) => {
          // console.log(data);
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
          this.router.navigate([`/login`]);
          
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
          this.router.navigate([`/login`]);
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private popupService: PopupMessagesService,
    private storage: TokenStorageService

  ) {}
}
