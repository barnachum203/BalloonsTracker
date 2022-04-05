import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormBase } from '../../../components/shared/forms/form-base';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  constructor() {}

  toFormGroup(fields: FormBase<string>[]) {
    const group: any = {};

    fields.forEach((field) => {
      group[field.key] = new FormControl(field.value || '', [
        field.required ? Validators.required : Validators.nullValidator,
        field.maxLength > 0
          ? Validators.maxLength(field.maxLength)
          : Validators.nullValidator,
        field.minLength > 0
          ? Validators.minLength(field.minLength)
          : Validators.nullValidator,
      ]);
    });
    return new FormGroup(group);
  }
}
