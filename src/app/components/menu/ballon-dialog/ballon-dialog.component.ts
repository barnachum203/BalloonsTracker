import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { Ballon, Color, Type, BallonPosition } from 'src/app/Model/Ballon';
import { QuestionService } from 'src/app/shared/question.service';
import { QuestionBase } from '../../shared/forms/question-base';
import * as MapSelectors from '../store/map.selectors';
import * as MapActions from '../store/map.actions';
import * as IDialog from './dialog.types';
import { MapState } from '../store/map.models';
import { createBallonRequest } from '../store/map.actions';

export interface DialogData {
  ballon?: Ballon;
  dialogType: string;
}

@Component({
  selector: 'app-ballon-dialog',
  templateUrl: './ballon-dialog.component.html',
  styleUrls: ['./ballon-dialog.component.css'],
  providers: [QuestionService],
})
export class BallonDialogComponent implements OnInit {
  ballon?: Ballon;
  questions$?: Observable<QuestionBase<any>[]>;
  title = '';
  mode = '';
  buttonName = '';

  constructor(
    public dialogRef: MatDialogRef<BallonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private store: Store<MapState>,
    private questionService: QuestionService
  ) {
    this.title = this.data.dialogType;

    switch (data.dialogType) {
      case IDialog.EDIT:
        this.mode = IDialog.EDIT;
        this.ballon = this.data.ballon;
        this.title = `Edit Air Ballon: ${this.ballon?.name}`;
        this.buttonName = 'Update';
        this.questions$ = this.questionService.getEditBallonQuestions(
          this.data.ballon!
        );
        break;

      case IDialog.ADD_NEW:
        this.mode = IDialog.ADD_NEW;
        this.title = 'Add new Air Ballon';
        this.buttonName = 'Create';
        this.questions$ = questionService.getAddBallonQuestions();
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {}

  onSave() {
    console.log('onSave()');
  }

  onCreate() {
    console.log('onCreate()');
  }
}
