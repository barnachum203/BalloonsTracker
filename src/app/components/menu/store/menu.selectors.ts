import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MenuState } from './menu.models';
import { menuFeatureKey } from './menu.reducers';
// Use Selectors when selecting slices of state
// When using the createSelector and createFeatureSelector functions @ngrx/store keeps track of the latest arguments in which your selector function was invoked.

// The createFeatureSelector<>() is a convenience method for returning a top level feature state. It returns a typed selector function for a feature slice of state.
export const selectMenu = createFeatureSelector<MenuState>(menuFeatureKey);


export const selectMode = createSelector(
  selectMenu,
  (state) => state.mode
);
