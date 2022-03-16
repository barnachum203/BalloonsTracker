import { FormBase } from './form-base';

export class TextboxForm extends FormBase<string> {
  override controlType = 'textbox';
}
