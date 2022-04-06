import { createReducer, on } from '@ngrx/store';
import * as MapActions from './menu.actions';
import { MenuState } from './menu.models';

// reducer state key
export const menuFeatureKey = 'menu';

// Setting the initial state
export const initialState: MenuState = {
  mode: '2D',
};

// Creating the reducer function
//  The reducer function's responsibility is to handle the state transitions in an immutable way.
export const menuReducer = createReducer(
  initialState,

  //Toggle mode
  on(
    MapActions.setMode2D,
    (state): MenuState => ({
      ...state,
      mode: '2D'
    })
  ),
  on(
    MapActions.setMode3D,
    (state): MenuState => ({
      ...state,
      mode: '3D'
    })
  ),

  on(
    MapActions.onLogout,
    (state): MenuState => ({
      ...state,
    })
  )
);
