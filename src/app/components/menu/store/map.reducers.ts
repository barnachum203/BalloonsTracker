import { createReducer, on } from '@ngrx/store';
import * as MapActions from './map.actions';
import { MapState } from './map.models';

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
export const mapFeatureKey = 'map';

// define a shape for the piece of state.
// export interface State {

// }

// Setting the initial state
//  The initial state gives the state an initial value, or provides a value if the current state is undefined.
export const initialState: MapState = {
  isLoading: false,
  hasError: false,
  error: undefined,
  errorMessage: undefined,
  ballons: undefined,
};

// Creating the reducer function
//  The reducer function's responsibility is to handle the state transitions in an immutable way.
export const mapReducer = createReducer(
  initialState,

  //Create
  on(
    MapActions.createBallonRequest,
    (state): MapState => ({
      ...state,
      isLoading: true,
      hasError: false,
    })
  ),
  on(
    MapActions.createBallonSuccess,
    (state): MapState => ({
      ...state,
      isLoading: false,
      hasError: false,
    })
  ),
  on(
    MapActions.createBallonFailure,
    (state): MapState => ({
      ...state,
      isLoading: false,
      hasError: true,
    })
  ),
  // update
  on(
    MapActions.updateRequest,
    (state): MapState => ({
      ...state,
      isLoading: true,
      hasError: false,
    })
  ),
  on(
    MapActions.updateSuccess,
    (state, action): MapState => ({
      ...state,
      //TODO: update ballon state
      isLoading: false,
      hasError: false,
    })
  ),
  on(
    MapActions.updateFailure,
    (state, action): MapState => ({
      ...state,
      isLoading: false,
      hasError: true,
      errorMessage: action.error.statusText,
      error: action.error,
    })
  ),
  //Get Ballons
  on(
    MapActions.getBallons,
    (state): MapState => ({
      ...state,
      error: undefined,
      errorMessage: undefined,
      ballons: undefined,
      hasError: false,
      // hasError: action.type === MapActions.UPDATE_FAILURE && !!action,
      isLoading: true,
    })
  ),

  on(
    MapActions.getBallonsSuccess,
    (state, action): MapState => ({
      ...state,
      error: undefined,
      errorMessage: undefined,
      ballons: action.ballons,
      hasError: false,
      isLoading: false,
    })
  ),

  on(
    MapActions.getBallonsFailure,
    (state, action): MapState => ({
      ...state,
      error: action.error,
      errorMessage: action.error.message,
      ballons: undefined,
      hasError: true,
      isLoading: false,
    })
  )
);
