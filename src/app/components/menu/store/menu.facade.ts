import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MenuActions from './menu.actions';
import * as MenuSelectors from './menu.selectors';

@Injectable()
export class MenuFacade {
  mode$ = this.store.select(MenuSelectors.selectMode);

  constructor(private store: Store) {}

  setMode2D(){
    this.store.dispatch(MenuActions.setMode2D());

  }
  setMode3D() {
    this.store.dispatch(MenuActions.setMode3D());
  }

  onLogout(){
    this.store.dispatch(MenuActions.onLogout())
  }
}
