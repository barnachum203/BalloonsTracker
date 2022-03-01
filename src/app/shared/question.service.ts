import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { QuestionBase } from '../components/shared/forms/question-base';
import { DropdownQuestion } from '../components/shared/forms/question-dropdown';
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
        value: 'test name',
        type: 'text',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'description',
        type: 'text',
        required: true,
        value: 'test value',
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
        key: 'name',
        label: 'Ballon name',
        value: ballon.name,
        type: 'text',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'description',
        type: 'text',
        required: true,
        value: ballon.description,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'latitude',
        label: 'latitude',
        type: 'number',
        // value: ballon.position.latitude.toString() || '1.00',
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'longitude',
        label: 'longitude',
        type: 'number',
        // value: ballon.position.longitude.toString() || '1.00',
        required: false,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'attitude',
        label: 'attitude',
        type: 'number',
        // value: ballon.position.attitude.toString() || '1.00',
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
}
