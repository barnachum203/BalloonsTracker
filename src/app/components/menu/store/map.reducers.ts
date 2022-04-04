import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Ballon } from 'src/app/Model/Ballon';
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
  hasError: undefined,
  error: undefined,
  errorMessage: undefined,
  ballons: undefined,
  activeBallon: undefined,
};
export const adapter: EntityAdapter<Ballon> = createEntityAdapter<Ballon>(); // test

// Creating the reducer function
//  The reducer function's responsibility is to handle the state transitions in an immutable way.
export const mapReducer = createReducer(
  initialState,

  //Create
  on(
    MapActions.createBallonRequest,
    (state): MapState => ({
      ...state,
      error: undefined,
      isLoading: true,
      hasError: false,
    })
  ),
  on(
    MapActions.createBallonSuccess,
    (state, action): MapState => ({
      ...state,
      isLoading: false,
      hasError: false,
      error: undefined,
      ballons: [...state.ballons!, action.ballon],
    })
  ),
  on(
    MapActions.createBallonFailure,
    (state, action): MapState => ({
      ...state,
      error: action.error,
      errorMessage: action.error.message,
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
    MapActions.updatePosition,
    (state, action): MapState => ({
      ...state,
      ballons: state.ballons?.map((e) => {
        if(e._id == action.id){ //TODO: Check that works by id
          var temp = Object.assign({}, e);
          temp.position = action.position
          return temp
        }
        return e
      }),
    })
  ),
  on(
    MapActions.updateSuccess,
    (state, action): MapState => ({
      ...state,
      //TODO: update ballon state
      isLoading: false,
      hasError: false,
      error: undefined,
      ballons: state.ballons?.map((e) => {
        return e._id == action.updatedBallon._id ? action.updatedBallon : e;
      }),
    })
  ),
  on(
    MapActions.updateFailure,
    (state, action): MapState => ({
      ...state,
      isLoading: false,
      hasError: true,
      errorMessage: action.error.message,
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
  ),
  //Map
  on(
    MapActions.activeBallon,
    (state, action): MapState => ({
      ...state,
      activeBallon: action.ballon
    })
  ),
  on(
    MapActions.unactiveBallon,
    (state): MapState => ({
      ...state,
      activeBallon: undefined
    })
  ),
);


