import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/services/auth.service';
import * as authSelectors from '../login/store/auth.selectors';
import * as authActions from '../login/store/auth.actions';
// import {  } from "../../../assets/logo/devalore.png";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string | undefined = undefined;
  isLoggedIn$ = this.store.select(authSelectors.selectIsLoggedIn);
  user$ = this.store.select(authSelectors.selectAuthUser);

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    authService.currentUser.subscribe((user) => {
      if (user) {
        this.username = user?.username;
        // this.user$ ={dasda: "ddd"}
      } else {
        this.username = undefined;
      }
    });
  }

  ngOnInit(): void {
    console.log();
  }

  logout() {
    this.store.dispatch(authActions.logout());
    this.authService.logout();
    this.router.navigate(['login']);
    console.log('Logged Out');
  }
}
