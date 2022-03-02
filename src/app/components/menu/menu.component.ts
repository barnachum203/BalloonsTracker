import { Component, Input, OnInit } from '@angular/core';
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
export class MenuComponent implements OnInit {
  // @Input() currentBallon!: Ballon;

  ballons!: Ballon[];
  ballons$ = this.store.select(MapSelectors.selectMapBallons)
  constructor(
    public dialog: MatDialog,
    private route: Router,
    // ballonService: BallonService,
    private store: Store
  ) {
    this.getBallons()
    // ballonService.getAllBallons().subscribe((data) => {
    //   this.ballons = data;
    //   console.log(this.ballons);
    // });
  }

  ngOnInit(): void {
    console.log();

  }

  getBallons(){
    //TODO: get ballons once
      this.store.dispatch(MapActions.getBallons())
  }

  openCreationDialog() {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      disableClose: false,
      data: { dialogType: IDialog.ADD_NEW },
    });
  }

  openEditDialog(ballon: any) {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      disableClose: false,
      data: { dialogType: IDialog.EDIT, ballon: ballon },
    });
  }
  onBallonClicked(ballon: Ballon) {
    this.route.navigate([`home/${ballon.id}`]);
  }
}
