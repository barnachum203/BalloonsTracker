import { Injectable } from '@angular/core';
import { Pet } from '../model/Pet';
import { User } from '../model/User';

const TOKEN_KEY = 'x-auth-token';
const USER_KEY = 'auth-user';
const USER_LIST = 'user-list';
const PETS_LIST = 'pets-list';

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

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public getPetsList(): Pet[] {
    const pets = window.sessionStorage.getItem(PETS_LIST);
    if (pets) {
      return JSON.parse(pets);
    }
    return [];
  }
  public deletePet(id: string): void {
    let pets: Pet[] = this.getPetsList();
    let index = pets.findIndex((pet) => pet._id == id);
    if (pets[index]._id == this.getPet()!._id) {
      this.signOut();
    }

    if (index > -1) {
      pets.splice(index, 1);
    }

    this.savePetsList(pets);
  }
  public savePetsList(pets: Pet[]): void {
    window.sessionStorage.removeItem(PETS_LIST);
    window.sessionStorage.setItem(PETS_LIST, JSON.stringify(pets));
  }
  public getPet(): User | null {
    const pet = window.sessionStorage.getItem(PETS_LIST);
    if (pet) {
      return JSON.parse(pet);
    }
    return null;
  }
  updatePetById(id: string, petToUpdate: Pet): void {
    let pets: Pet[] = this.getPetsList();
    let index = pets.findIndex((pet) => pet._id == id);
    if (pets[index]._id == this.getPet()!._id) {
      this.savePet(petToUpdate);
    }
    pets[index] = petToUpdate;
    this.savePetsList(pets);
  }
  public savePet(pet: Pet): void {
    window.sessionStorage.removeItem(PETS_LIST);
    window.sessionStorage.setItem(PETS_LIST, JSON.stringify(pet));
  }
  getPetById(id: string): Pet {
    return this.getPetsList().find((pet) => pet._id == id)!;
  }
}
