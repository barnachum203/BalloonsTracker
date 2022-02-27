import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map((action) => action),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        map((action) => action),
        tap((error) => {
        //   console.log("error");
        
          this.router.navigate([`/login`]);
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
    private router: Router
  ) {}
}
