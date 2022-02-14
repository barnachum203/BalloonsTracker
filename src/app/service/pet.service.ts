import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../model/Pet';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  REST_API: string = 'http://localhost:8001/api/pets';

  // Http Header
  httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-auth-token', this.tokenStorage.getToken()!);

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  // Add pet
  addPet(data: Pet): Observable<any> {
    let API_URL = `${this.REST_API}/create`;
    return this.httpClient.post(API_URL, data, {
      headers: this.httpHeaders,
    });
  }

  // Get all pets under 3
  getAllUnder3(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/under3`, {
      headers: this.httpHeaders,
    });
  }

  // Get all pets
  getAll(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/`, {
      headers: this.httpHeaders,
    });
  }

  // Get single pet
  getPet(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/pet/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // Update pet
  updatePet(id: string, pet: Pet): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL,  pet , { headers: this.httpHeaders });
  }

  // Delete pet
  deletePet(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders });
  }
}
