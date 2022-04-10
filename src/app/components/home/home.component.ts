import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapComponent } from '../map/map3d/map.component';
import { Map2dComponent } from '../map/map2d/map2d.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}

  radioValue: '3D' | '2D' = '2D';

  // get selected() {
  //   console.log("dsad");

  //   switch (this.radioValue) {
  //     case '3D': {
  //       return MapComponent;
  //     }
  //     case '2D': {
  //       return Map2dComponent;
  //     }
  //     default:
  //       return MapComponent;
  //   }
  // }

  // componentName: string = '';
  // onKey(componentName: string): void {
  //   this.componentName = componentName;
  // }

}
