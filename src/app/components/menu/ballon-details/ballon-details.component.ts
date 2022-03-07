import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ballon, BallonPosition } from 'src/app/Model/Ballon';
import * as MapSelectors from '../store/map.selectors';
import * as MapActions from '../store/map.actions';

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
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.subscribtion = this.ballons$.subscribe((data) => {
      this.ballon = data?.find((e) => e.id == this.id);
      this.position = this.ballon?.position    
    });
  }

  getBallonById() {}
  backToMenu() {
    this.store.dispatch(MapActions.unactiveBallon())
    this.route.navigate(['home']);
  }

  onSave() {}
}
