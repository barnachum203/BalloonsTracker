import { AfterContentInit, Component, ElementRef, OnInit } from '@angular/core';
import { Viewer } from 'cesium';
import { MenuFacade } from '../../menu/store/menu.facade';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterContentInit {

  constructor(private el:ElementRef, private menuFacade: MenuFacade) {
    
    
  }
  ngAfterContentInit(): void {
    this.menuFacade.setMode3D()
    console.log("ngAfterContentInit3D");

  }
  ngOnInit(): void {
    console.log();
  }
}
