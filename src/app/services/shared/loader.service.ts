import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  show() {
    this.isLoading.next(true);
  }
  hide() {
    // setTimeout(() => {
    this.isLoading.next(false);
    // }, 3000);
  }
}
