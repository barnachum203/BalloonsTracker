import { HttpErrorResponse } from '@angular/common/http';
import { Ballon } from 'src/app/Model/Ballon';

export enum TokenStatus {
  PENDING = 'PENDING',
  VALIDATING = 'VALIDATING',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface MapState {
  isLoading: boolean;
  hasError: boolean | undefined;
  error?: HttpErrorResponse;
  errorMessage?: string;
  ballons: Ballon[] | undefined;
  activeBallon?: Ballon;
}
