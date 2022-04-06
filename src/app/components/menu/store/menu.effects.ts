import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { PopupMessagesService } from 'src/app/services/shared/popup-messages.service';
import { NavigationService } from 'src/app/services/shared/navigation.service';

@Injectable()
export class MapEffects {

  constructor( 
    private actions$: Actions,
    private popupService: PopupMessagesService,
    private router: NavigationService,
  ) {}
}
