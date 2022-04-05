import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/services/shared/forms/form-control.service';
import { FormBase } from '../form-base';
import { Store } from '@ngrx/store';
import { Ballon, BallonPosition } from 'src/app/Model/Ballon';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [FormControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormBase<string>[] | null = [];
  @Input() buttonName: string | undefined;
  @Input() mode: string | undefined;
  @Input() isDialog: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit = new EventEmitter<any>();
  
  form!: FormGroup;
  payLoad!: Ballon;
  positionPayload!: BallonPosition;

  constructor(private fcs: FormControlService, private store: Store) {}

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.fields as FormBase<string>[]);
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
    this.positionPayload = this.form.getRawValue();
    this.submit.emit(this.payLoad);
  }

  onCancel() {
    this.close.emit(null);
  }
}
