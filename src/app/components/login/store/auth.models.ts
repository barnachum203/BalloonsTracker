import { HttpErrorResponse } from "@angular/common/http";

export enum TokenStatus {
    PENDING = 'PENDING',
    VALIDATING = 'VALIDATING',
    VALID = 'VALID',
    INVALID = 'INVALID',
  }
  
  export interface AuthState {
    isLoggedIn: boolean;
    user?: AuthUser;
    // email: string;
    accessTokenStatus?: TokenStatus;
    isLoadingLogin: boolean;
    hasLoginError: boolean;

    error?: HttpErrorResponse;
    errorMessage?: string
  }
  
  export interface AuthUser {
    id: number;
    _id?:string;
    email: string;
    password: string;
    username: string;
  }
  