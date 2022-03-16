import { FormBase } from './form-base';

export class TextareaForm extends FormBase<string> {
  override controlType = 'textarea';
}
