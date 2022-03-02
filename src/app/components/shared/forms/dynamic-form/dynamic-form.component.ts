import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from 'src/app/shared/question-control.service';
import { QuestionBase } from '../question-base';
import * as IDialog from '../../../menu/ballon-dialog/dialog.types';
import { Store } from '@ngrx/store';
import * as MapActions from '../../../menu/store/map.actions';
import { Ballon } from 'src/app/Model/Ballon';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() buttonName: string | undefined;
  @Input() mode: string | undefined;

  form!: FormGroup;
  payLoad!: Ballon;

  constructor(private qcs: QuestionControlService, private store: Store) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();

    if (this.mode == IDialog.EDIT) {

      const ballon: Ballon = new Ballon(
        this.payLoad.name,
        this.payLoad.type,
        this.payLoad.description,
        this.payLoad.color,
        this.payLoad.position,
        this.payLoad.id
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
        this.payLoad.position,
      );
      console.log(ballon);

      this.store.dispatch(MapActions.createBallonRequest({ ballon }));
    }
  }
}
