import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/login/snack-bar/snack-bar.component';

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
    });
  }
  openFailureLogin() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Wrong username or password :(',
      duration: 2500,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  }

  openSuccessPopup(msg: string){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: 2500,
      panelClass: ['green-snackbar', 'success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  openFailurePopup(msg: string){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: 2500,
      panelClass: ['red-snackbar', 'failure-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  openGlobalPopup(msg: string){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: msg,
      duration: 5500,
      panelClass: ['blue-snackbar', 'failure-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
