import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ballon } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/services/ballon.service';
import { BallonDialogComponent } from './ballon-dialog/ballon-dialog.component';
import * as IDialog from './ballon-dialog/dialog.types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  // @Input() currentBallon!: Ballon;

  ballons!: Ballon[];
  constructor(
    public dialog: MatDialog,
    private route: Router,
    ballonService: BallonService
  ) {
    ballonService.getAllBallons().subscribe((data) => {
      this.ballons = data;
      console.log(this.ballons);
    });
  }

  ngOnInit(): void {
    console.log();
  }

  openCreationDialog() {
    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '640px',
      disableClose: false,
      data: { dialogType: IDialog.ADD_NEW },
    });
  }

  openEditDialog(ballon: any) {
    console.log(ballon);

    const dialogRef = this.dialog.open(BallonDialogComponent, {
      width: '640px',
      disableClose: false,
      data: { dialogType: IDialog.EDIT, ballon: ballon },
    });
  }
  onBallonClicked(ballon: Ballon) {
    // console.log(ballon);

    this.route.navigate([`home/${ballon.id}`]);
  }
}
