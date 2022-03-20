import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import mockDb from '../../assets/mockdb/mockDb.json';

import { environment } from '../../../environments/environment';
import { User } from '../../Model/User';
import { AuthUser } from 'src/app/components/login/store/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  currentUser: Subject<User | null> = new Subject<User | null>();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password,
    };

    return this.http.post(this.apiUrl + '/login', { user });
  }

  logout() {
    this.currentUser.next(null);
  }
}
