import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSignUpSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser()!.first_name.toString();
    }
  }

  onSubmit(): void {
    const { first_name, email, password } = this.form;

    this.authService.register(first_name, email, password).subscribe(
      (data) => {
        // console.log(data);
        this.isSignUpSuccessful = true;
        this.isSignUpFailed = false;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.href = '/login';
  }
}
