import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // DynamicFormComponent,
    // DynamicFormFieldComponent,
  ],
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    // DynamicFormComponent,
    // DynamicFormFieldComponent,
  ],
})
export class DynamicFormsModule {}
