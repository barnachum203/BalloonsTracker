import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionBase } from '../components/shared/forms/question-base';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  form!: FormGroup;
  // loginFormFields: BallonBase<string>[]

  constructor(private fb : FormBuilder) { }

  createNewBallon(){
    return new FormGroup({
      id: this.fb.control(null),

    })
  }

  loginForm(){
    return new FormGroup({
      email: this.fb.control(null),
      password: this.fb.control(null)
    })
  }
}
