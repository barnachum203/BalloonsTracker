import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonDialogComponent } from './ballon-dialog/ballon-dialog.component';
import * as IDialog from './ballon-dialog/dialog.types';
import { MenuFacade } from './store/menu.facade';
import { Subscription } from 'rxjs';
import { MapFacade } from '../map/store/map.facade';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  mode: string ='';

  ballons$ = this.mapFacade.ballons$;
  storeData: Ballon[] | undefined;
  subscribtions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private menuFacade: MenuFacade,
    private mapFacade: MapFacade
  ) {
    //Check if data exist in store before send http request.
    this.subscribtions.push(this.ballons$.subscribe((data) => {
      this.storeData = data;
      console.log(this.mode);
      
      //if data isn't exist - send request
      if (!this.storeData) {
        this.getBallons();
      }
    })
    )

    this.subscribtions.push(this.menuFacade.mode$.subscribe(val => {
      this.mode = val
      
    }))
  }
  ngOnDestroy(): void {
    this.subscribtions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    console.log();
  }

  getBallons() {
    //TODO: get ballons once
    this.mapFacade.getAllBalloons();
  }

  openCreationDialog() {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      height: '700px',
      disableClose: false,
      data: { dialogType: IDialog.ADD_NEW },
    });
  }

  onBallonClicked(ballon: Ballon) {
    this.mapFacade.setActiveBalloon(ballon)
  }
}
