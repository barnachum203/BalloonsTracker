import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // DynamicFormComponent,
    // DynamicFormQuestionComponent,
  ],
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    // DynamicFormComponent,
    // DynamicFormQuestionComponent,
  ],
})
export class DynamicFormsModule {}
