export class FormBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  maxLength:  number;
  minLength: number;
  disabled: boolean;
  type: string;
  options: { key: string; value: string }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      maxLength?:  number;
      minLength?: number;
      disabled?: boolean;
      type?: string;
      options?: { key: string; value: string }[];
    }
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.maxLength = options.maxLength || 0;
    this.minLength = options.minLength || 0;
    this.disabled = options.disabled || false;
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
