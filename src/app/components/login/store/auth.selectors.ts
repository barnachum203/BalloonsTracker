import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.models';
import { authFeatureKey } from './auth.reducers';
// Use Selectors when selecting slices of state
// When using the createSelector and createFeatureSelector functions @ngrx/store keeps track of the latest arguments in which your selector function was invoked.

// The createFeatureSelector<>() is a convenience method for returning a top level feature state. It returns a typed selector function for a feature slice of state.
export const selectAuth = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state) => state.isLoggedIn
);

export const selectLoginError = createSelector(
  selectAuth,
  (state) => state.hasLoginError
);

//return message from HttpErrorResponse
export const selectAuthErrorMessage = createSelector(
  selectAuth,
  (state) => state.errorMessage
);


export const selectIsLoadingLogin = createSelector(
  selectAuth,
  (state) => state.isLoadingLogin
);

export const selectAuthUser = createSelector(selectAuth, (state) => state.user);
