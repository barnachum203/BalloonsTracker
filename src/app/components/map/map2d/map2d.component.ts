import { AfterContentInit, Component, ElementRef, OnInit } from '@angular/core';
import { MenuFacade } from '../../menu/store/menu.facade';

@Component({
  selector: 'app-map2d',
  templateUrl: './map2d.component.html',
  styleUrls: ['./map2d.component.css']
})
export class Map2dComponent implements OnInit, AfterContentInit {

  constructor(private el:ElementRef, private menuFacade: MenuFacade) {
  }
  ngAfterContentInit(): void {
    this.menuFacade.setMode2D()
    console.log("ngAfterContentInit2D");
    
  }
  
  ngOnInit(): void {
    console.log("2d");
    
  }

}
