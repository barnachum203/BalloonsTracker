import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuestionBase } from '../components/shared/forms/question-base';

@Injectable({
  providedIn: 'root',
})
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = new FormControl(question.value || '', [
        question.required 
        ? Validators.required 
        : Validators.nullValidator,
        question.maxLength > 0
          ? Validators.maxLength(question.maxLength)
          : Validators.nullValidator,
          question.minLength > 0
          ? Validators.minLength(question.minLength)
          : Validators.nullValidator,
      ]);      
    });    
    return new FormGroup(group);
  }
}
