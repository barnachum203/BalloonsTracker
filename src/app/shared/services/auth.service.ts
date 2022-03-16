import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import mockDb from '../../assets/mockdb/mockDb.json';

import { environment } from '../../../environments/environment';
import { User } from '../../Model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  currentUser: Subject<User | null> = new Subject<User | null>();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // NOTE: uncomment to get latency
    if (environment.IS_MOCK) {
      // return new Observable((observer) => {
      //   setTimeout(() => {
      //       observer.next(mockDb['login'])
      //       // observer.error({"message": 'Wrong username or password.'})
      //   }, 1000)
      // });
    }
    return this.http.post(this.apiUrl + '/login', { email, password });
  }

  logout() {
    this.currentUser.next(null);
  }
}
