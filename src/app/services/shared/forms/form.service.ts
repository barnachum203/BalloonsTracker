import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { FormBase } from '../../../components/shared/forms/form-base';
import { DropdownForm } from '../../../components/shared/forms/form-dropdown';
import { TextareaForm } from '../../../components/shared/forms/form-textarea';
import { TextboxForm } from '../../../components/shared/forms/form-textbox';
import { Ballon, Color, Type } from '../../../Model/Ballon';
@Injectable()
export class FormService {
  // TODO: get from a remote source of field metadata
  getAddBallonFields() {
    const fields: FormBase<string>[] = [
      new TextboxForm({
        key: 'name',
        label: 'Ballon name',
        type: 'text',
        maxLength: 25,
        required: true,
        order: 1,
      }),
      new TextareaForm({
        key: 'description',
        label: 'description',
        type: 'textarea',
        maxLength: 25,
        required: true,
        order: 2,
      }),
      new TextboxForm({
        key: 'latitude',
        label: 'latitude',
        type: 'number',
        required: false,
        order: 3,
      }),
      new TextboxForm({
        key: 'longitude',
        label: 'longitude',
        type: 'number',
        required: false,
        order: 3,
      }),
      new TextboxForm({
        key: 'attitude',
        label: 'attitude',
        type: 'number',
        required: false,
        order: 3,
      }),

      new DropdownForm({
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
      new DropdownForm({
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

    return of(fields.sort((a, b) => a.order - b.order));
  }
  getEditBallonFields(ballon: Ballon) {
    const fields: FormBase<string>[] = [
      new TextboxForm({
        key: '_id',
        label: 'id',
        value: ballon._id,
        disabled: true,
        type: 'text',
        required: true,
        order: 0,
      }),

      new TextboxForm({
        key: 'name',
        label: 'Ballon name',
        value: ballon.name,
        maxLength: 25,
        type: 'text',
        required: true,
        order: 1,
      }),

      new TextareaForm({
        key: 'description',
        label: 'description',
        type: 'textarea',
        required: true,
        value: ballon.description,
        maxLength: 150,
        order: 2,
      }),
      new TextboxForm({
        key: 'latitude',
        label: 'latitude',
        type: 'number',
        value: ballon.point.latitude.toString(),
        required: false,
        order: 3,
      }),
      new TextboxForm({
        key: 'longitude',
        label: 'longitude',
        type: 'number',
        value: ballon.point.longitude.toString(),
        required: false,
        order: 3,
      }),
      new TextboxForm({
        key: 'attitude',
        label: 'attitude',
        type: 'number',
        value: ballon.point.attitude.toString(),
        required: false,
        order: 3,
      }),

      new DropdownForm({
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
      new DropdownForm({
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

    return of(fields.sort((a, b) => a.order - b.order));
  }
}
