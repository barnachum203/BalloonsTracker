import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ballon } from 'src/app/Model/Ballon';

import * as MapActions from './map.actions';
import * as MapSelectors from './map.selectors';

@Injectable()
export class MapFacade {
  activeBalloon$ = this.store.select(MapSelectors.selectActiveBallon);
  hasError$ = this.store.select(MapSelectors.selectMapError);
  isLoadig$ = this.store.select(MapSelectors.selectIsLoading);
  ballons$ = this.store.select(MapSelectors.selectMapBallons);
  hasMapError$ = this.store.select(MapSelectors.selectMapError);
  errorMessage$ = this.store.select(MapSelectors.selectMapErrorMessage);
  error$ = this.store.select(MapSelectors.selectError);

  constructor(private store: Store) {}

  createBalloon(ballon: Ballon) {
    this.store.dispatch(MapActions.createBallonRequest({ ballon }));
  }

  updateBalloon(ballon: Ballon) {
    this.store.dispatch(MapActions.updateRequest({ ballon }));
  }

  getAllBalloons() {
    this.store.dispatch(MapActions.getBallons());
  }
  setActiveBalloon(ballon: Ballon) {
    this.store.dispatch(MapActions.activeBallon({ ballon }));
  }

  deactivateBalloon() {
    this.store.dispatch(MapActions.unactiveBallon());
  }
  onLogout(){
    this.store.dispatch(MapActions.onLogout())
  }
}
