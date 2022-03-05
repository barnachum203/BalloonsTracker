import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/services/ballon.service';
import { BallonDialogComponent } from './ballon-dialog/ballon-dialog.component';
import * as IDialog from './ballon-dialog/dialog.types';
import * as MapActions from './store/map.actions';
import { MapState } from './store/map.models';
import * as MapSelectors from './store/map.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  // @Input() currentBallon!: Ballon;

  // ballons!: Ballon[];

  ballons$ = this.store.select(MapSelectors.selectMapBallons);
  storeData: Ballon[] | undefined;
  subscribtion;

  constructor(
    public dialog: MatDialog,
    private route: Router,
    private store: Store
  ) {
    //Check if data exist in store before send http request.
    this.subscribtion = this.ballons$.subscribe((data) => {
      this.storeData = data;
      //if data isn't exist - send request
      if (!this.storeData) {
        this.getBallons();
      }
    });

    // ballonService.getAllBallons().subscribe((data) => {
    //   this.ballons = data;
    //   console.log(this.ballons);
    // });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    console.log();
  }

  getBallons() {
    //TODO: get ballons once
    this.store.dispatch(MapActions.getBallons());
  }

  openCreationDialog() {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      height: '700px',
      disableClose: false,
      data: { dialogType: IDialog.ADD_NEW },
    });
  }

  openEditDialog(ballon: any) {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      height: '700px',
      disableClose: false,
      data: { dialogType: IDialog.EDIT, ballon: ballon },
    });
  }
  onBallonClicked(ballon: Ballon) {
    this.route.navigate([`home/${ballon.id}`]);
  }
}
