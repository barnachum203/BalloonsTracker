import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export enum ValidatorsErr{
  required = 'required',
  maxlength = 'maxlength',
}

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css'],
})
export class ShowErrorsComponent {
  @Input() ctrl!: FormControl | AbstractControl ;

  ERROR_MESSAGE = {
    required: () => `This field is required`,
    maxlength: (par: any) => `Max ${par.requiredLength} chars is required`,
  };
  constructor() {}

  shouldShowErrors(): boolean {
    return (this.ctrl && this.ctrl.errors && this.ctrl.touched) || false;
  }

  listOfErrors(): string[] {
    return (
      Object.keys(this.ctrl!.errors!).map((err) =>
        this.ERROR_MESSAGE['maxlength'](this.ctrl?.getError(err))
      ) 
    );
  }

  
}
 