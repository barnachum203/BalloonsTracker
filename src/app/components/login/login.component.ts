import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFacade } from './store/auth.facade';
import { AuthUser } from './store/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitted = false;
  isLoadingLogin$ = this.authFacade.isLoadingLogin$;
  isLoginFailed$ = this.authFacade.hasLoginError$;
  hasLoginError$ = this.authFacade.hasLoginError$;
  public user: AuthUser = {
    email: '',
    password: '',
    id: 0,
    username: '',
  };
  message: string = '';

  errorMessage$ = this.authFacade.errorMessage$;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
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

  get f() {
    return this.loginForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
    this.authFacade.logout();
    //add logout action
  }
  onLogin() {
    let { email, password } = this.loginForm.value;
    this.submitted = true;

    this.user.email = email;
    this.user.password = password;
    this.authFacade.login(email, password);
  }
}
