import { Component, Inject } from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Ballon, BallonPosition } from 'src/app/Model/Ballon';
import { FormService } from 'src/app/services/shared/forms/form.service';
import { FormBase } from '../../shared/forms/form-base';
import * as IDialog from './dialog.types';
import { MapFacade } from '../store/map.facade';

export interface DialogData {
  ballon?: Ballon;
  dialogType: string;
}

@Component({
  selector: 'app-ballon-dialog',
  templateUrl: './ballon-dialog.component.html',
  styleUrls: ['./ballon-dialog.component.css'],
  providers: [FormService],
})
export class BallonDialogComponent {
  ballon?: Ballon;
  fields$?: Observable<FormBase<any>[]>;
  title = '';
  mode = '';
  buttonName = '';
  subscriptions: Subscription[] = [];
  error$ = this.mapFacade.error$;
  hasError$ = this.mapFacade.hasError$;
  isLoading$ = this.mapFacade.isLoadig$;

  constructor(
    public dialogRef: MatDialogRef<BallonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formService: FormService,
    private mapFacade: MapFacade
  ) {
    this.title = this.data.dialogType;

    switch (data.dialogType) {
      case IDialog.EDIT:
        this.mode = IDialog.EDIT;
        this.ballon = this.data.ballon;
        this.title = `Edit Air Ballon: ${this.ballon?.name}`;
        this.buttonName = 'Update';
        this.fields$ = this.formService.getEditBallonFields(this.data.ballon!);
        break;

      case IDialog.ADD_NEW:
        this.mode = IDialog.ADD_NEW;
        this.title = 'Add New Air Ballon';
        this.buttonName = 'Create';
        this.fields$ = formService.getAddBallonFields();
        break;

      default:
        break;
    }
  }

  onSave(payLoad: any) {
    // this.payLoad = payLoad;
    console.log('ON SAVE !!');
    if (payLoad.type != 'submit') {
      console.log(payLoad);

      const positionPayload: BallonPosition = payLoad;

      const position: BallonPosition = {
        longitude: Number(positionPayload.longitude),
        attitude: Number(positionPayload.attitude),
        latitude: Number(positionPayload.latitude),
      };

      if (this.mode == IDialog.EDIT) {
        const ballon: Ballon = new Ballon(
          payLoad.name,
          payLoad.type,
          payLoad.description,
          payLoad.color,
          position,
          position,
          payLoad._id
        );
        console.log(ballon);

        this.mapFacade.updateBalloon(ballon);
      }
      if (this.mode == IDialog.ADD_NEW) {
        const ballon: Ballon = new Ballon(
          payLoad.name,
          payLoad.type,
          payLoad.description,
          payLoad.color,
          position,
          position
        );
        if (ballon) console.log(ballon);

        this.mapFacade.createBalloon(ballon);
      }
      console.log('onSave()');
      this.subscriptions.push(
        this.isLoading$.subscribe((isLoading) => {
          this.subscriptions.push(
            this.hasError$.subscribe((hasError) => {
              this.subscriptions.push(
                this.error$.subscribe((error) => {
                  if (
                    error == undefined &&
                    isLoading == false &&
                    hasError == false
                  ) {
                    this.closeDialog();
                  }
                })
              );
            })
          );
        })
      );
    }
  }

  onCreate() {
    console.log('onCreate()');
  }
  closeDialog() {
    this.subscriptions.forEach((e) => {
      e.unsubscribe();
    });
    this.dialogRef.close();
  }
}
