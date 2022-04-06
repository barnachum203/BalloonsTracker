import { createAction } from '@ngrx/store';

// Constants
export const MODE_2D: string = '[Menu] MODE 2D';
export const MODE_3D: string = '[Menu] MODE 3D';
export const ON_LOGOUT: string = '[Menu] Logout';

// Actions
export const setMode2D = createAction(MODE_2D);
export const setMode3D = createAction(MODE_3D);

export const onLogout = createAction(ON_LOGOUT);
