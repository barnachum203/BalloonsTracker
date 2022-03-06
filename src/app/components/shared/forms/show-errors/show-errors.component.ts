import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';


@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css'],
})
export class ShowErrorsComponent {
  @Input() ctrl!: FormControl | AbstractControl;

  private ERROR_MESSAGE: any = {
    required: () => `This field is required`,
    maxlength: (par: any) => `Max ${par['requiredLength']} chars is required`,
    minlength: (par: any) => `Min ${par['requiredLength']} chars is required`,
  };
  constructor() {}

  shouldShowErrors(): boolean {
    return (this.ctrl && this.ctrl.errors && this.ctrl.touched) || false;
  }

  listOfErrors(): string[] {
      // Object.keys(this.ctrl.errors!).map((err) =>
      //   console.log(
      //     err
      //   )  
      // )

    return Object.keys(this.ctrl.errors!).map((err) =>
      this.ERROR_MESSAGE[err](this.ctrl?.getError(err))
    );
  }
}
