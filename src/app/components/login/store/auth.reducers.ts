import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, TokenStatus } from './auth.models';

/**
 * Reducers in NgRx are responsible for handling transitions from one state to the next state
 * Reducer functions handle these transitions by determining which actions to handle based on the action's type.
 *
 * There are a few consistent parts of every piece of state managed by a reducer.
 * An interface or type that defines the shape of the state.
 * The arguments including the initial state or current state and the current action.
 * The functions that handle state changes for their associated action(s).
 */

// reducer state key
export const authFeatureKey = 'auth';

// define a shape for the piece of state.
export interface State {
  // email: string;
  // password: string;
  // username: string | undefined;
  isLoggedIn: boolean;
  isLoadingLogin: boolean;
}

// Setting the initial state
//  The initial state gives the state an initial value, or provides a value if the current state is undefined.
export const initialState: AuthState = {
  accessTokenStatus: TokenStatus.PENDING,
  // email: '',

  // errorMessage: '',
  user: undefined,
  isLoggedIn: false,
  isLoadingLogin: false,
  hasLoginError: false,
  error: undefined,
  errorMessage: undefined,
};

// Creating the reducer function
//  The reducer function's responsibility is to handle the state transitions in an immutable way.
export const loginReducer = createReducer(
  initialState,
  // Login
  on(
    AuthActions.loginRequest,
    (state): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: true,
      hasLoginError: false,
    })
  ),
  on(
    AuthActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALID,
      user: action.user,
      isLoggedIn: true,
      isLoadingLogin: false,
      hasLoginError: false,
      errorMessage: undefined
    })
  ),
  on(
    AuthActions.loginFailure,
    (state, action): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.INVALID,
      isLoggedIn: false,
      isLoadingLogin: false,
      hasLoginError: true,
      errorMessage: action.error.message,
      error: action.error.error,
    })
  ),
  //Logout
  on(
    AuthActions.logout,
    (state, action): AuthState => ({
      ...state,

      error: undefined,
      errorMessage: undefined,
      user: undefined,
      hasLoginError: action.type === AuthActions.LOGIN_FAILURE && !!action,
      isLoggedIn: false,
      isLoadingLogin: false,
      accessTokenStatus: TokenStatus.INVALID,
    })
  )
);
