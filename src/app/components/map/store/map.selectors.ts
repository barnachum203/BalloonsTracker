import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MapState } from './map.models';
import { mapFeatureKey } from './map.reducers';
// Use Selectors when selecting slices of state
// When using the createSelector and createFeatureSelector functions @ngrx/store keeps track of the latest arguments in which your selector function was invoked.

// The createFeatureSelector<>() is a convenience method for returning a top level feature state. It returns a typed selector function for a feature slice of state.
export const selectMap = createFeatureSelector<MapState>(mapFeatureKey);


export const selectMapError = createSelector(
  selectMap,
  (state) => state.hasError
);

//return message from HttpErrorResponse
export const selectMapErrorMessage = createSelector(
  selectMap,
  (state) => state.errorMessage
);

export const selectIsLoading = createSelector(
  selectMap,
  (state) => state.isLoading
);

export const selectMapBallons = createSelector(
  selectMap,
  (state) => state.ballons
);


export const selectError = createSelector(
  selectMap,
  (state) => state.error
);

// Map selectors
export const selectActiveBallon = createSelector(
  selectMap,
  (state) => state.activeBallon
);