import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/services/ballon.service';
import { PopupMessagesService } from 'src/app/shared/popup-messages.service';
import * as MapActions from './map.actions';

@Injectable()
export class MapEffects {
  getAllBallons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.getBallons),
      exhaustMap(() =>
        this.ballonService.getAllBallons().pipe(
          map((ballons) => MapActions.getBallonsSuccess({ ballons })),
          catchError((error) => of(MapActions.getBallonsFailure({ error })))
        )
      )
    )
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.updateRequest),
      exhaustMap((action) =>
        this.ballonService.updateBallon(action.ballon).pipe(
          map((updatedBallon: Ballon) =>
            MapActions.updateSuccess({ updatedBallon })
          ),
          catchError((error) => of(MapActions.updateFailure({ error })))
        )
      )
    )
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MapActions.updateSuccess),
        // tap(() => this.router.navigate(['/home'])),
        tap(() => {
          this.popupService.openSuccessUpdate();
        })
      ),
    { dispatch: false }
  );

  updateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MapActions.updateFailure),
        tap(() => {
          this.popupService.openFailureUpdate();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private ballonService: BallonService,
    private router: Router,
    private popupService: PopupMessagesService
  ) {}
}
