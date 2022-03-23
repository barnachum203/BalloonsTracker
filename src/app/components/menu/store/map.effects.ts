import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/shared/services/ballon.service';
import { PopupMessagesService } from 'src/app/shared/popup-messages.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import * as MapActions from './map.actions';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../login/store/auth.actions';

@Injectable()
export class MapEffects {
  getAllBallons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.getBallons),
      exhaustMap(() =>
        this.ballonService.getAllBallons().pipe(
          map((data:any) => MapActions.getBallonsSuccess({ballons: data.balloons})),
          catchError((error) => {
            this.errorHandler(error)
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
            this.errorHandler(error)
            // console.log(error);
            
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

  errorHandler(error:any){
    // console.log(error);
    if(error.status === 401){
      console.error("Got error 401");
      this.store.dispatch(AuthActions.logout())
      return EMPTY
    }    
    return 
  }
  constructor(
    private actions$: Actions,
    private ballonService: BallonService,
    private popupService: PopupMessagesService,
    private router: Router,
    private store: Store,
  ) {}
}
