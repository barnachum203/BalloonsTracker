import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/login/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class PopupMessagesService {

  constructor(public snackBar: MatSnackBar) { }

  openSuccessLogin(): void {
    
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: 'Login Success!',
        duration: 3500,
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    
  }
  openFailureLogin() {
    
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'Wrong username or password :(',
      duration: 3500,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  
}


}