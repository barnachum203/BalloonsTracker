import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/login/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class PopupMessagesService {
  constructor(public snackBar: MatSnackBar) {}

  openSuccessLogin(): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Login Success!! :)',
      duration: 2500,
      panelClass: ['green-snackbar', 'login-snackbar'],
      // verticalPosition: 'top',
    });
  }
  openFailureLogin() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Wrong username or password :(',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
      // verticalPosition: 'top',
      // horizontalPosition:'right'
    });
  }
  openFailureUpdate() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Failed update a ballon :(',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  openSuccessUpdate() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Updated :)',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  openSuccessCreate() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Created :)',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  openFailureCreate() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Fail to create new Air Ballon.',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
