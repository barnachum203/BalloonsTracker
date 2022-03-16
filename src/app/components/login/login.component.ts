import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import * as authLogin from './store/auth.actions';
import { AuthUser } from './store/auth.models';
import * as authSelectors from './store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  isLoadingLogin$ = this.store.select(authSelectors.selectIsLoadingLogin);
  isLoginFailed$ = this.store.select(authSelectors.selectLoginError);
  hasLoginError$ = this.store.select(authSelectors.selectLoginError);
  public user: AuthUser = {
    email: '',
    password: '',
    id: 0,
    username: '',
  };
  message: string = '';
  errorMessage: string = 'Wrong username or password.';

  errorMessage$ = this.store.select(authSelectors.selectAuthErrorMessage);

  pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{8,12}$';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store,
    public snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required, Validators.maxLength(20)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(
            '((?=.*[a-z])(?=.*[$@!%*?&;`#^()~_=+~{}[|":;,.<>])(?=.*[0-9]).{8,12})'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log();
  }
  get f() {
    return this.loginForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
    //add logout action
  }
  async onLogin() {
    // console.log(this.loginForm.value);
    let { email, password } = this.loginForm.value;
    this.submitted = true;

    console.log(email);

    this.user.email = email;
    this.user.password = password;
    await this.store.dispatch(
      authLogin.loginRequest({ email: email, password: password })
    );

    // this.store.dispatch(AuthActions.loginRequest({ username, password }));

    // this.authService.login(email, password).subscribe(
    //   (data) => {
    //     if (data) {
    //       console.log(data);
    //       // this.submitted = false;
    //       this.message = data.message;
    //       this.authService.currentUser.next(data);
    //       this.store.dispatch(authLogin.loginSuccess({ user: this.user }));

    //       this.router.navigate(['home']);
    //     }
    //   },
    //   (error) => {
    //     this.store.dispatch(authLogin.loginFailure(error));
    //     this.errorMessage = error.message;
    //   }
    // );
  }
}
