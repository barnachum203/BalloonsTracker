import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Ballon } from 'src/app/Model/Ballon';
import { QuestionService } from 'src/app/shared/question.service';
import { QuestionBase } from '../../shared/forms/question-base';

import * as IDialog from './dialog.types';

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

  constructor(
    public dialogRef: MatDialogRef<BallonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private questionService: QuestionService
  ) {
    this.title = this.data.dialogType;

    if (data.dialogType == IDialog.EDIT) {
      this.mode = 'EDIT';
      this.ballon = this.data.ballon;
      this.title = `Edit Air Ballon: ${this.ballon?.name}`;

      if (this.data.ballon)
        this.questions$ = this.questionService.getEditBallonQuestions(
          this.data.ballon
        );
        
    } else {
      this.mode = 'NEW';
      this.title = 'Add new Air Ballon';
      this.questions$ = questionService.getAddBallonQuestions();
    }
  }

  ngOnInit(): void {}
}
