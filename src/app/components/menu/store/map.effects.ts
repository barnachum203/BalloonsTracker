import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { BallonService } from 'src/app/services/ballon.service';
import { PopupMessagesService } from 'src/app/services/shared/popup-messages.service';
import * as MapActions from './map.actions';
import { NavigationService } from 'src/app/services/shared/navigation.service';

@Injectable()
export class MapEffects {
  getAllBallons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.getBallons),
      exhaustMap(() =>
        this.ballonService.getAllBallons().pipe(
          map((data:any) => MapActions.getBallonsSuccess({ballons: data.balloons})),
          catchError((error) => {
            return of(MapActions.getBallonsFailure({ error }))})
        )
      )
    )
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.updateRequest),
      exhaustMap((action) =>
        this.ballonService.updateBallon(action.ballon).pipe(
          map((data: any) =>
            MapActions.updateSuccess({ updatedBallon: data.balloon})
          ),
          catchError((error) => of(MapActions.updateFailure({ error: error.error })))
        )
      )
    )
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MapActions.updateSuccess),
        tap((data) => {
          console.log(data);
          
          this.popupService.openSuccessPopup("Update Air Balloon Successfully!");
        })
      ),
    { dispatch: false }
  );

  updateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MapActions.updateFailure),
        tap((error) => {
          this.popupService.openFailurePopup(error.error.message);
        })
      ),
    { dispatch: false }
  );

  createBallonRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.createBallonRequest),
      exhaustMap((action) =>
        this.ballonService.createBallon(action.ballon).pipe(
          map((data:any) => MapActions.createBallonSuccess({ballon: data.balloon})),
          catchError((error) => {            
            return of(MapActions.createBallonFailure({error: error.error}))})
        )
      )
    )
  );

  createBallonSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MapActions.createBallonSuccess),
        tap(() => {          
          this.popupService.openSuccessPopup("Balloon Created Successfully!");
        })
      ),
    { dispatch: false }
  );

  createBallonFailure$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(MapActions.createBallonFailure),
        tap((error) => {          
          this.popupService.openFailurePopup(error.error.message);
        })
      ),
    { dispatch: false }
  );

  activeBallon$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(MapActions.activeBallon),
        tap((data) => {
          this.router.navToBalloonById(data.ballon._id!.toString()) 
        })
      ),
    { dispatch: false }
  );

  unactiveBallon$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(MapActions.unactiveBallon),
        tap(() => {
          this.router.home()
        })
      ),
    { dispatch: false }
  );

  constructor( 
    private actions$: Actions,
    private ballonService: BallonService,
    private popupService: PopupMessagesService,
    private router: NavigationService,
  ) {}
}
