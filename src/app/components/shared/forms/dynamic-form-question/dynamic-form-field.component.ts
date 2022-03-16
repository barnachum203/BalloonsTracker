import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from '../form-base';

@Component({
  selector: 'app-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent  {

  @Input() field!: FormBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }

  constructor() { }



}
