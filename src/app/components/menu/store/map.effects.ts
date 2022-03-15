import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/services/ballon.service';
import { PopupMessagesService } from 'src/app/shared/popup-messages.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import * as MapActions from './map.actions';

@Injectable()
export class MapEffects {
  getAllBallons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.getBallons),
      exhaustMap(() =>
        this.ballonService.getAllBallons().pipe(
          map((data:any) => MapActions.getBallonsSuccess({ballons: data.balloons})),
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
          map((data: any) =>
            MapActions.updateSuccess({ updatedBallon: data.result})
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
        tap(() => {
          this.popupService.openFailurePopup("Unable To Update Air Balloon :(");
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
          catchError((error) => of(MapActions.createBallonFailure({error})))
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
          console.log(error.error.message);
          
          this.popupService.openFailurePopup("Unable to create Balloon :(");
        })
      ),
    { dispatch: false }
  );

  activeBallon$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(MapActions.activeBallon),
        tap((data) => {
          this.router.navigate(['home/'+data.ballon._id])   
        })
      ),
    { dispatch: false }
  );

  // updatePosition$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MapActions.updatePosition),
  //     tap((action) =>
  //       this.ballonService.updateBallon(action.ballon).pipe(
  //       )
  //     )
  //   )
  // );
  unactiveBallon$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(MapActions.unactiveBallon),
        tap(() => {
          this.router.navigate(['home/'])   
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private ballonService: BallonService,
    private popupService: PopupMessagesService,
    private router: Router,
    private storage: TokenStorageService
  ) {}
}
