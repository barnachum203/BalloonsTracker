import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ballon, BallonPosition } from 'src/app/Model/Ballon';
import * as MapSelectors from '../../map/store/map.selectors';
import * as MapActions from '../../map/store/map.actions';
import { MatDialog } from '@angular/material/dialog';
import { BallonDialogComponent } from '../ballon-dialog/ballon-dialog.component';
import * as IDialog from '../ballon-dialog/dialog.types';

@Component({
  selector: 'app-ballon-details',
  templateUrl: './ballon-details.component.html',
  styleUrls: ['./ballon-details.component.css'],
})
export class BallonDetailsComponent implements OnInit, OnDestroy {
  ballon!: Ballon | undefined;

  ballons$ = this.store.select(MapSelectors.selectMapBallons);
  subscribtion: Subscription = new Subscription();

  position: BallonPosition | undefined;
  id!: string;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,

  ) {}
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.subscribtion = this.ballons$.subscribe((data) => {
      this.ballon = data?.find(e => e._id == this.id);
      this.position = this.ballon?.position
    });
  }

  getBallonById() {}

  openEditDialog() {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '440px',
      height: '700px',
      disableClose: false,
      data: { dialogType: IDialog.EDIT, ballon: this.ballon },
    });
  }
  backToMenu() {
    this.store.dispatch(MapActions.unactiveBallon())
    // this.route.navigate(['home']);
  }

  onSave() {}
}
