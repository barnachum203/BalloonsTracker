import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ballon } from '../../Model/Ballon';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BallonService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storage: TokenStorageService) {}

  getAllBallons(): Observable<Ballon[]> {
    return this.http.get<Ballon[]>(this.apiUrl + '/balloon');
  }

  getBallonById(id: any): Ballon {
    throw new Error('Method not implemented.');
  }

  updateBallon(balloon: Ballon): Observable<Ballon> {
    console.log("update balloon called", balloon);
    
    return this.http.put<Ballon>(this.apiUrl + '/balloon', { balloon: balloon, bid:balloon._id });
  }

  createBallon(balloon: Ballon): Observable<Ballon> {
    return this.http.post<Ballon>(this.apiUrl + '/balloon', { balloon });
  }
}
