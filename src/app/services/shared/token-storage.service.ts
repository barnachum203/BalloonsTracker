import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authorization';
const USER_KEY = 'user_id';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserId(userId: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(userId));
  }

  public getUserId(): string | null {
    const userId = window.sessionStorage.getItem(USER_KEY);
    if (userId) {
      return JSON.parse(userId);
    }
    return null;
  }
}
