import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenStorageService } from 'src/app/services/shared/token-storage.service';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  auth$ = this.store.select(AuthSelectors.selectAuth);
  user$ = this.store.select(AuthSelectors.selectAuthUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  isLoadingLogin$ = this.store.select(AuthSelectors.selectIsLoadingLogin);
  hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);
  errorMessage$ = this.store.select(AuthSelectors.selectAuthErrorMessage);

  constructor(private store: Store, private storageService: TokenStorageService) {}

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.loginRequest({ email, password }));
  }

  logout() {
    this.storageService.signOut();
    this.store.dispatch(AuthActions.logout());
  }
}
