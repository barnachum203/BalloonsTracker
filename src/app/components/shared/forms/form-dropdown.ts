import { FormBase } from './form-base';

export class DropdownForm extends FormBase<string> {
  override controlType = 'dropdown';
}
