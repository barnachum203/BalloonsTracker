import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ballon } from '../Model/Ballon';

@Injectable({
  providedIn: 'root',
})
export class BallonService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllBallons(): Observable<Ballon[]> {
    return this.http.get<Ballon[]>(this.apiUrl + '/ballon');
  }

  getBallonById(id: any): Ballon {
    throw new Error('Method not implemented.');
  }

  updateBallon(ballon: Ballon): Observable<Ballon> {
    return this.http.put<Ballon>(this.apiUrl + '/ballon', { ballon });
  }
  
  createBallon(ballon: Ballon): Observable<Ballon> {
    return this.http.post<Ballon>(this.apiUrl + '/ballon', { ballon });
  }
}
