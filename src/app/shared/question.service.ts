import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { QuestionBase } from '../components/shared/forms/question-base';
import { DropdownQuestion } from '../components/shared/forms/question-dropdown';
import { TextareaQuestion } from '../components/shared/forms/question-textarea';
import { TextboxQuestion } from '../components/shared/forms/question-textbox';
import { Ballon, Color, Type } from '../Model/Ballon';
@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'color',
        label: 'Color',
        options: [
          { key: Color.red, value: Color.red },
          { key: Color.blue, value: Color.blue },
          { key: Color.black, value: Color.black },
          { key: Color.white, value: Color.white },
        ],
        order: 3,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
  getAddBallonQuestions() {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Ballon name',
        type: 'text',
        maxLength: 25,
        required: true,
        order: 1,
      }),
      new TextareaQuestion({
        key: 'description',
        label: 'description',
        type: 'textarea',
        maxLength: 25,
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'latitude',
        label: 'latitude',
        type: 'number',
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'longitude',
        label: 'longitude',
        type: 'number',
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'attitude',
        label: 'attitude',
        type: 'number',
        required: false,
        order: 3,
      }),

      new DropdownQuestion({
        key: 'color',
        label: 'Color',
        options: [
          { key: Color.red, value: Color.red },
          { key: Color.blue, value: Color.blue },
          { key: Color.black, value: Color.black },
          { key: Color.white, value: Color.white },
        ],
        order: 4,
      }),
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        options: [
          { key: Type.small, value: Type.small },
          { key: Type.medium, value: Type.medium },
          { key: Type.big, value: Type.big },
          { key: Type.medium, value: Type.medium },
        ],
        order: 5,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
  getEditBallonQuestions(ballon: Ballon) {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: '_id',
        label: 'id',
        value: ballon._id,
        type: 'text',
        required: true,
        order: 0,
      }),

      new TextboxQuestion({
        key: 'name',
        label: 'Ballon name',
        value: ballon.name,
        maxLength: 25,
        type: 'text',
        required: true,
        order: 1,
      }),

      new TextareaQuestion({
        key: 'description',
        label: 'description',
        type: 'textarea',
        required: true,
        value: ballon.description,
        maxLength: 150,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'latitude',
        label: 'latitude',
        type: 'number',
        value: ballon.position.latitude.toString(),
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'longitude',
        label: 'longitude',
        type: 'number',
        value: ballon.position.longitude.toString(),
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'attitude',
        label: 'attitude',
        type: 'number',
        value: ballon.position.attitude.toString(),
        required: false,
        order: 3,
      }),

      new DropdownQuestion({
        key: 'color',
        label: 'Color',
        required: true,
        value: ballon.color,
        options: [
          { key: Color.red, value: Color.red },
          { key: Color.blue, value: Color.blue },
          { key: Color.black, value: Color.black },
          { key: Color.white, value: Color.white },
        ],
        order: 4,
      }),
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        value: ballon.type,
        required: true,
        options: [
          { key: Type.small, value: Type.small },
          { key: Type.medium, value: Type.medium },
          { key: Type.big, value: Type.big },
          { key: Type.medium, value: Type.medium },
        ],
        order: 5,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
