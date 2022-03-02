import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Ballon } from 'src/app/Model/Ballon';
/**
 *
 * There are a few rules to writing good actions within your application.
 *
 * Upfront - write actions before developing features to understand and gain a shared knowledge of the feature being implemented.
 * Divide - categorize actions based on the event source.
 * Many - actions are inexpensive to write, so the more actions you write, the better you express flows in your application.
 * Event-Driven - capture events not commands as you are separating the description of an event and the handling of that event.
 * Descriptive - provide context that are targeted to a unique event with more detailed information you can use to aid in debugging with the developer tools.
 *
 *
 */

export interface IAction {
  type: ''; // - describing the action that will be dispatched in the application
  /* Used in pattern: '[Source] Event'
    EXAMPLE:
    type: '[Auth API] Login Success'
    */
}
export const UPDATE_REQUEST: string = '[Map] Update Request';
export const UPDATE_SUCCESS: string = '[Map] Update Success';
export const UPDATE_FAILURE: string = '[Map] Update Failure';

export const GET_BALLONS: string = '[Map] Get Ballons';
export const GET_BALLONS_SUCCESS: string = '[Map] Get Ballons Success';
export const GET_BALLONS_FAILURE: string = '[Map] Get Ballons Failure';

export const SHOW_BALLON: string = '[Map] Show Ballon';

let action: IAction;
// createAction function returns a function, that when called returns an object in the shape of the Action interface.
// The props method is used to define any additional metadata needed for the handling of the action.

// Update Actions
export const updateRequest = createAction(
  UPDATE_REQUEST,
  props<{ ballon: Ballon }>()
);
export const updateSuccess = createAction(
  UPDATE_SUCCESS,
  props<{ updatedBallon: Ballon }>()
);
export const updateFailure = createAction(
  UPDATE_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

// Get Ballons
export const getBallons = createAction(
  GET_BALLONS
);
export const getBallonsSuccess = createAction(
  GET_BALLONS_SUCCESS,
  props<{ballons: Ballon[]}>()
);
export const getBallonsFailure = createAction(
  GET_BALLONS_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

// ????
export const showBallon = createAction(
  SHOW_BALLON,
  props<{ error: HttpErrorResponse }>()
);

