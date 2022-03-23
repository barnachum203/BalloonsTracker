import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(public router: Router) {}

  home(){
    this.router.navigate(['/home'])
  }
  login(){
    this.router.navigate(['/login'])
  }

}
