import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthUser } from './auth.models';
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
export const LOGIN_REQUEST: string = '[Auth] Login Request';
export const LOGIN_SUCCESS: string = '[Auth] Login Success';
export const LOGIN_FAILURE: string = '[Auth] Login Failure';
export const LOGOUT: string = '[Auth] Logout';

let action: IAction;
// createAction function returns a function, that when called returns an object in the shape of the Action interface.
// The props method is used to define any additional metadata needed for the handling of the action.

// Login
export const loginRequest = createAction(
  LOGIN_REQUEST,
  props<{ email: string, password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: AuthUser, token: string }>()
);
export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

// Logout
export const logout = createAction(LOGOUT);
