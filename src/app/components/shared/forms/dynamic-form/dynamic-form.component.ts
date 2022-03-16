import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/shared/form-control.service';
import { FormBase } from '../form-base';
import * as IDialog from '../../../menu/ballon-dialog/dialog.types';
import { Store } from '@ngrx/store';
import * as MapActions from '../../../menu/store/map.actions';
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

    // console.log(this.payLoad);

    const position: BallonPosition = {
      longitude: Number(this.positionPayload.longitude),
      attitude: Number(this.positionPayload.attitude),
      latitude: Number(this.positionPayload.latitude),
    };

    if (this.mode == IDialog.EDIT) {
      const ballon: Ballon = new Ballon(
        this.payLoad.name,
        this.payLoad.type,
        this.payLoad.description,
        this.payLoad.color,
        position,
        position,
        this.payLoad._id
      );
      console.log(ballon);

      this.store.dispatch(MapActions.updateRequest({ ballon }));
    }
    if (this.mode == IDialog.ADD_NEW) {
      const ballon: Ballon = new Ballon(
        this.payLoad.name,
        this.payLoad.type,
        this.payLoad.description,
        this.payLoad.color,
        position,
        position
      );
      console.log(ballon);

      this.store.dispatch(MapActions.createBallonRequest({ ballon }));
    }
  }
}
